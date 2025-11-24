
import { NextRequest, NextResponse } from 'next/server';
import { initializeApp, getApp, getApps } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';

// Initialize Firebase Admin SDK
if (!getApps().length) {
  initializeApp();
}

const db = getFirestore();

export async function POST(
  req: NextRequest,
  { params }: { params: { userId: string; webhookId: string } }
) {
  try {
    const { userId, webhookId } = params;

    if (!userId || !webhookId) {
      return NextResponse.json({ error: 'Missing userId or webhookId' }, { status: 400 });
    }

    const body = await req.json();
    
    // Example payload: { "transactionId": "xyz", "price": 97.50, "status": "paid" | "pending" }
    const { transactionId, price, status } = body;

    if (typeof price !== 'number' || price <= 0) {
      return NextResponse.json({ error: 'Invalid or missing price in request body' }, { status: 400 });
    }
     if (!transactionId) {
      return NextResponse.json({ error: 'Missing transactionId' }, { status: 400 });
    }
     if (!status || !['paid', 'pending'].includes(status)) {
      return NextResponse.json({ error: 'Invalid or missing status' }, { status: 400 });
    }

    const userRef = db.collection('users').doc(userId);
    const webhookRef = userRef.collection('webhooks').doc(webhookId);
    
    // Check if the webhook exists and belongs to the user
    const webhookDoc = await webhookRef.get();
    if (!webhookDoc.exists) {
        return NextResponse.json({ error: 'Webhook not found' }, { status: 404 });
    }

    const saleRef = userRef.collection('sales').doc(transactionId);
    
    // Create or update sale record
    await saleRef.set({
        id: transactionId,
        price: price,
        status: status,
        receivedAt: FieldValue.serverTimestamp(),
    }, { merge: true });


    // If payment is successful, atomically update the user's balance
    if (status === 'paid') {
        await userRef.update({
            balance: FieldValue.increment(price)
        });
    }

    return NextResponse.json({ success: true, message: `Sale ${transactionId} processed for user ${userId}.` });

  } catch (error: any) {
    console.error('Webhook processing error:', error);
    return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
}
