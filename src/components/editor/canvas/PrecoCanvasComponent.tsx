'use client';

import type { CanvasComponentData } from '../types';

export const PrecoCanvasComponent = ({ component }: { component: CanvasComponentData }) => {
  const {
    planName = 'Plano Premium',
    price = 'R$ 39,90',
    priceSubtitle = 'à vista',
    discountText = '15% Off',
    popularText = 'Mais Popular',
    showPopularBanner = true,
    cardBgColor = '#FFFFFF',
    priceBoxColor = '#E5E7EB',
    priceTextColor = '#111827',
    popularBannerColor = '#1F2937',
    popularTextColor = '#FFFFFF',
  } = component.props;

  return (
    <div className="mx-auto w-full max-w-sm overflow-hidden rounded-lg shadow-md">
      {showPopularBanner && (
        <div
          className="py-2 text-center font-semibold"
          style={{ backgroundColor: popularBannerColor, color: popularTextColor }}
        >
          {popularText}
        </div>
      )}
      <div
        className="flex items-center justify-between p-6"
        style={{ backgroundColor: cardBgColor, color: '#000000' }}
      >
        <h4 className="text-2xl font-bold">{planName}</h4>
        <div
          className="rounded-lg p-3 text-center"
          style={{ backgroundColor: priceBoxColor, color: priceTextColor }}
        >
          {discountText && <p className="text-xs">{discountText}</p>}
          <p className="text-2xl font-bold">{price}</p>
          {priceSubtitle && <p className="text-xs">{priceSubtitle}</p>}
        </div>
      </div>
    </div>
  );
};
