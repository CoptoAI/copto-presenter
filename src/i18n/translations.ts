export type UiLanguage = 'en' | 'ar';

export interface TranslationDictionary {
  appTitle: string;
  copticCalendarDate: string;
  searchPlaceholder: string;
  presenterControl: string;
  launchProjector: string;
  toggleSidebar: string;
  fontSize: string;
  themeDark: string;
  themeProjector: string;
  themeLight: string;
  themeSepia: string;
  fullscreen: string;
  
  // Category Groups
  groupLiturgy: string;
  groupAgpeya: string;
  groupPraises: string;
  groupPascha: string;

  // Categories
  catVespers: string;
  catMatins: string;
  catOfferingLamb: string;
  catLiturgyWord: string;
  catBasilFaithful: string;
  catGregoryFaithful: string;
  catCyrilFaithful: string;
  catDistribution: string;
  catAgpeya1: string;
  catAgpeya3: string;
  catAgpeya6: string;
  catAgpeya9: string;
  catAgpeya11: string;
  catAgpeya12: string;
  catAgpeyaVeil: string;
  catMidnightPraises: string;
  catVesperPraises: string;
  catMorningPraises: string;
  catFuneralPrayer: string;

  // Presenter Controls
  liveOutput: string;
  upcomingPreview: string;
  activeSlide: string;
  previous: string;
  nextSlide: string;
  allSlides: string;
}

export const translations: Record<UiLanguage, TranslationDictionary> = {
  en: {
    appTitle: 'COPTO PRESENTER',
    copticCalendarDate: 'Coptic Calendar Date',
    searchPlaceholder: 'Search services & prayers...',
    presenterControl: 'Presenter Control',
    launchProjector: 'Launch Projector',
    toggleSidebar: 'Toggle Navigation Menu',
    fontSize: 'Font Size',
    themeDark: 'Dark Theme',
    themeProjector: 'Projector High-Contrast Mode',
    themeLight: 'Light Theme',
    themeSepia: 'Sepia Theme',
    fullscreen: 'Toggle Fullscreen',

    groupLiturgy: 'Holy Liturgy',
    groupAgpeya: 'Agpeya (Book of Hours)',
    groupPraises: 'Psalmodies & Praises',
    groupPascha: 'Holy Pascha',

    catVespers: 'Vespers Raising of Incense',
    catMatins: 'Matins Raising of Incense',
    catOfferingLamb: 'Offering of the Lamb',
    catLiturgyWord: 'Liturgy of the Word',
    catBasilFaithful: 'St. Basil - Faithful',
    catGregoryFaithful: 'St. Gregory - Faithful',
    catCyrilFaithful: 'St. Cyril - Faithful',
    catDistribution: 'Distribution of Mysteries',
    catAgpeya1: '1st Hour (Prime - 6 AM)',
    catAgpeya3: '3rd Hour (Terce - 9 AM)',
    catAgpeya6: '6th Hour (Sext - 12 PM)',
    catAgpeya9: '9th Hour (None - 3 PM)',
    catAgpeya11: '11th Hour (Vespers - 5 PM)',
    catAgpeya12: '12th Hour (Compline - 6 PM)',
    catAgpeyaVeil: 'Veil Prayer (Monastic)',
    catMidnightPraises: 'Midnight Praises (Tasbeha)',
    catVesperPraises: 'Vesper Praises',
    catMorningPraises: 'Morning Praises',
    catFuneralPrayer: 'General Funeral Prayer',

    liveOutput: 'LIVE PROJECTOR OUTPUT',
    upcomingPreview: 'UPCOMING SLIDE PREVIEW',
    activeSlide: 'Active Slide',
    previous: 'Previous',
    nextSlide: 'Next Slide',
    allSlides: 'All Slides in Section'
  },
  ar: {
    appTitle: 'عرض الصلوات القبطية',
    copticCalendarDate: 'التاريخ القبطي',
    searchPlaceholder: 'ابحث في الصلوات والقراءات...',
    presenterControl: 'لوحة العرض',
    launchProjector: 'شاشة العرض (البث)',
    toggleSidebar: 'قائمة الصلوات',
    fontSize: 'حجم الخط',
    themeDark: 'الوضع الليلي',
    themeProjector: 'وضع الشاشة العالية التباين',
    themeLight: 'الوضع النهاري',
    themeSepia: 'الوضع الدافئ',
    fullscreen: 'ملء الشاشة',

    groupLiturgy: 'القداس الإلهي',
    groupAgpeya: 'الأجبية (صلوات السواعي)',
    groupPraises: 'التسبحة والتسابيح',
    groupPascha: 'البصخة المقدسة',

    catVespers: 'رفع بخور عشية',
    catMatins: 'رفع بخور باكر',
    catOfferingLamb: 'تقديم الحمل',
    catLiturgyWord: 'قداس الكلمة (الموعوظين)',
    catBasilFaithful: 'القداس الباسيلي - المؤمنين',
    catGregoryFaithful: 'القداس الغريغوري - المؤمنين',
    catCyrilFaithful: 'القداس الكيرلسي - المؤمنين',
    catDistribution: 'التوزيع والتناول',
    catAgpeya1: 'صلاة باكر (الساعة الأولى - ٦ ص)',
    catAgpeya3: 'صلاة الثالثة (٩ ص)',
    catAgpeya6: 'صلاة السادسة (١٢ ظ)',
    catAgpeya9: 'صلاة التاسعة (٣ ع)',
    catAgpeya11: 'صلاة الحادية عشرة (غروب - ٥ ع)',
    catAgpeya12: 'صلاة الثانية عشرة (نوم - ٦ ع)',
    catAgpeyaVeil: 'صلاة الستار (للرهبان)',
    catMidnightPraises: 'تسبحة نصف الليل',
    catVesperPraises: 'تسبحة عشية',
    catMorningPraises: 'تسبحة باكر',
    catFuneralPrayer: 'الجناز العام',

    liveOutput: 'البث المباشر للشاشة',
    upcomingPreview: 'معاينة الشريحة القادمة',
    activeSlide: 'الشريحة الحالية',
    previous: 'السابق',
    nextSlide: 'الشريحة التالية',
    allSlides: 'جميع شرائح الخدمة'
  }
};
