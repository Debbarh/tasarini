
import { ConversionTracking } from "@/types/affiliate";

export class AffiliateService {
  private static conversions: ConversionTracking[] = [];

  // Tracker un clic d'affiliation
  static trackClick(affiliateId: string, activityId: string): string {
    const clickId = `click_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const tracking: ConversionTracking = {
      clickId,
      affiliateId,
      activityId,
      timestamp: new Date(),
      converted: false
    };

    this.conversions.push(tracking);
    console.log('Affiliate click tracked:', tracking);
    
    return clickId;
  }

  // Marquer une conversion
  static markConversion(clickId: string, commission: number, conversionValue: number) {
    const tracking = this.conversions.find(c => c.clickId === clickId);
    if (tracking) {
      tracking.converted = true;
      tracking.commission = commission;
      tracking.conversionValue = conversionValue;
      console.log('Conversion tracked:', tracking);
    }
  }

  // Obtenir les statistiques d'affiliation
  static getStats() {
    const totalClicks = this.conversions.length;
    const totalConversions = this.conversions.filter(c => c.converted).length;
    const totalCommission = this.conversions
      .filter(c => c.converted)
      .reduce((sum, c) => sum + (c.commission || 0), 0);
    
    return {
      totalClicks,
      totalConversions,
      conversionRate: totalClicks > 0 ? (totalConversions / totalClicks) * 100 : 0,
      totalCommission,
      conversions: this.conversions
    };
  }

  // Générer des données d'exemple avec affiliation
  static generateSampleAffiliateData() {
    return {
      affiliateId: 'partner_001',
      bookingUrl: 'https://booking.com/activity/example',
      commission: 8.5, // 8.5% de commission
      available: true,
      originalPrice: 85,
      discountedPrice: 75,
      provider: 'booking' as const,
      providerName: 'Booking.com',
      rating: 4.6,
      reviews: 342,
      instantConfirmation: true,
      freeCancellation: true
    };
  }
}
