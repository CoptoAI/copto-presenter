import { LiturgicalSection, SectionCategory } from '../types';
import { resolveDailyKatamerosReadings } from '../domain/katamerosEngine';

export function getServiceTitle(category: SectionCategory): string {
  switch (category) {
    case 'VESPERS': return 'Vespers Raising of Incense';
    case 'MATINS': return 'Matins Raising of Incense';
    case 'OFFERING_OF_THE_LAMB': return 'Offering of the Lamb';
    case 'LITURGY_OF_THE_WORD': return 'Liturgy of the Word (Catechumens)';
    case 'ST_BASIL_LITURGY_OF_THE_FAITHFUL': return 'Liturgy of St. Basil - The Faithful';
    case 'ST_GREGORY_LITURGY_OF_THE_FAITHFUL': return 'Liturgy of St. Gregory - The Faithful';
    case 'ST_CYRIL_LITURGY_OF_THE_FAITHFUL': return 'Liturgy of St. Cyril - The Faithful';
    case 'DISTRIBUTION': return 'Distribution of the Holy Mysteries';
    case 'AGPEYA_1ST_HOUR': return 'Agpeya - First Hour (Prime)';
    case 'AGPEYA_3RD_HOUR': return 'Agpeya - Third Hour (Terce)';
    case 'AGPEYA_6TH_HOUR': return 'Agpeya - Sixth Hour (Sext)';
    case 'AGPEYA_9TH_HOUR': return 'Agpeya - Ninth Hour (None)';
    case 'AGPEYA_11TH_HOUR': return 'Agpeya - Eleventh Hour (Vespers)';
    case 'AGPEYA_12TH_HOUR': return 'Agpeya - Twelfth Hour (Compline)';
    case 'AGPEYA_VEIL': return 'Agpeya - Veil Prayer';
    case 'MIDNIGHT_PRAISES': return 'Midnight Praises (Tasbeha)';
    case 'VESPER_PRAISES': return 'Vesper Praises';
    case 'MORNING_PRAISES': return 'Morning Praises';
    case 'KATAMEROS_READINGS': return 'Daily Katameros & Synaxarium Readings';
    case 'PASCHA_GENERAL_FUNERAL_PRAYER': return 'Pascha - General Funeral Prayer';
    default: return 'Coptic Orthodox Service';
  }
}

export function buildLiturgicalService(category: SectionCategory, dateInput?: Date): LiturgicalSection[] {
  const serviceTitle = getServiceTitle(category);

  if (category === 'KATAMEROS_READINGS') {
    const katameros = resolveDailyKatamerosReadings(dateInput || new Date());
    return [
      {
        id: 'katameros-section',
        title: {
          english: `Daily Katameros & Synaxarium (${katameros.copticDateString})`,
          arabic: `القطمارس اليومي والسنكسار (${katameros.copticDateString})`
        },
        subtitle: katameros.copticDateString,
        category: 'KATAMEROS_READINGS',
        items: [
          katameros.pauline,
          katameros.catholic,
          katameros.praxis,
          katameros.synaxarium,
          katameros.psalm,
          katameros.gospel
        ]
      }
    ];
  }

  // Return formatted sections for dynamic rendering
  return [
    {
      id: `${category}-1`,
      title: serviceTitle,
      subtitle: 'In the Name of the Father, and the Son, and the Holy Spirit',
      category,
      items: [
        {
          id: 'item-intro',
          role: 'all',
          type: 'prayer',
          title: {
            english: 'Introduction Prayer',
            coptic: 'Ϧⲉⲛ ⲫⲣⲁⲛ ⲙⲪⲓⲱⲧ',
            arabic: 'بسم الآب والابن والروح القدس'
          },
          text: {
            english: [
              'In the name of the Father and the Son and the Holy Spirit, one God. Amen.',
              'Lord have mercy, Lord have mercy, Lord bless us. Amen.',
              'Glory be to the Father, and to the Son, and to the Holy Spirit, now and forever and unto the ages of all ages. Amen.'
            ],
            coptic: [
              'Ϧⲉⲛ ⲫⲣⲁⲛ ⲙⲪⲓⲱⲧ ⲛⲉⲙ ⲡϣⲏⲣⲓ ⲛⲉⲙ ⲡⲓⲡⲛⲉⲩⲙⲁ ⲉⲑⲟⲩⲁⲃ ⲟⲩⲛⲟⲩϯ ⲛⲟⲩⲱⲧ: ⲁⲙⲏⲛ.',
              'Ⲕⲩⲣⲓⲉ ⲉⲗⲉⲏⲥⲟⲛ: Ⲕⲩⲣⲓⲉ ⲉⲗⲉⲏⲥⲟⲛ: Ⲕⲩⲣⲓⲉ ⲉⲩⲗⲟⲅⲏⲥⲟⲛ: ⲁⲙⲏⲛ.',
              'ⲫⲱⲥ ⲅⲁⲣ ⲙⲡⲓⲱⲧ ⲛⲉⲙ ⲡϣⲏⲣⲓ ⲛⲉⲙ ⲡⲓⲡⲛⲉⲩⲙⲁ ⲉⲑⲟⲩⲁⲃ ϯⲛⲟⲩ ⲛⲉⲙ ϣⲁ ⲉⲛⲉϩ.'
            ],
            arabic: [
              'بسم الآب والابن والروح القدس الإله الواحد. أمين.',
              'يا رب ارحم، يا رب ارحم، يا رب بارك. أمين.',
              'المجد للآب والابن والروح القدس، الآن وكل أوائل الدهور وإلى دهر الداهرين. أمين.'
            ]
          }
        },
        {
          id: 'item-lords-prayer',
          role: 'all',
          type: 'prayer',
          title: {
            english: "The Lord's Prayer",
            coptic: 'Ⲡⲉⲛⲓⲱⲧ ⲉⲧⲭⲉⲛ ⲛⲓⲫⲏⲟⲩⲓ',
            arabic: 'أبانا الذي في السماوات'
          },
          user: {
            english: 'People',
            coptic: 'Ⲡⲓⲗⲁⲟⲥ',
            arabic: 'الشعب'
          },
          text: {
            english: [
              'Our Father who art in heaven, hallowed be Thy name. Thy kingdom come. Thy will be done, on earth as it is in heaven.',
              'Give us this day our daily bread, and forgive us our trespasses, as we forgive those who trespass against us.',
              'And lead us not into temptation, but deliver us from the evil one. In Christ Jesus our Lord, for Thine is the kingdom, the power, and the glory forever. Amen.'
            ],
            coptic: [
              'Ⲡⲉⲛⲓⲱⲧ ⲉⲧⲭⲉⲛ ⲛⲓⲫⲏⲟⲩⲓ: ⲙⲁⲣⲉϥⲧⲟⲩⲃⲟ ⲛϫⲉ ⲡⲉⲕⲣⲁⲛ: ⲙⲁⲣⲉⲥⲓ ⲛϫⲉ ⲧⲉⲕⲙⲉⲧⲟⲩⲣⲟ.',
              'ⲡⲉⲛⲱⲓⲕ ⲛⲧⲉ ⲣⲁⲥϯ ⲙⲏⲓϥ ⲛⲁⲛ ⲙⲫⲟⲟⲩ: ⲟⲩⲟϩ ⲭⲱ ⲛⲁⲛ ⲉⲃⲟbullet ⲛⲛⲏⲉⲧⲉⲣⲟⲛ.',
              'ⲙⲡⲉⲣⲉⲛⲧⲉⲛ ⲉϩⲟⲩⲛ ⲉⲡⲉⲓⲣⲁⲥⲙⲟⲥ: ⲁⲗⲗⲁ ⲛⲁϩⲙⲉⲛ ⲉⲃⲟⲗ ϩⲁ ⲡⲓⲡⲉⲧϩⲱⲟⲩ: Ϧⲉⲛ Ⲡⲭⲣⲓⲥⲧⲟⲥ Ⲓⲏⲥⲟⲩⲥ Ⲡⲉⲛϭⲟⲓⲥ.'
            ],
            arabic: [
              'أبانا الذي في السماوات، ليتقدس اسمك. ليأت ملكوتك. لتكن مشيئتك كما في السماء كذلك على الأرض.',
              'خبزنا كفافنا أعطنا اليوم، واغفر لنا ذنوبنا كما نغفر نحن أيضاً للمذنبين إلينا.',
              'ولا تدخلنا في تجربة، لكن نجنا من الشرير. بالمسيح يسوع ربنا، لأن لك الملك والقوة والمجد إلى الأبد. أمين.'
            ]
          }
        },
        {
          id: 'item-thanksgiving',
          role: 'priest',
          type: 'prayer',
          title: {
            english: 'The Thanksgiving Prayer',
            coptic: 'ⲙⲁⲣⲉⲛϣⲉⲡϩⲙⲟⲧ ⲛⲧⲉⲛ Ⲫⲛⲟⲩϯ',
            arabic: 'صلاة الشكر'
          },
          user: {
            english: 'Priest',
            coptic: 'Ⲡⲓⲟⲩⲏⲃ',
            arabic: 'الكاهن'
          },
          text: {
            english: [
              'Let us give thanks to the beneficent and merciful God, the Father of our Lord, God and Savior Jesus Christ.',
              'For He has covered us, helped us, preserved us, accepted us unto Himself, had compassion on us, supported us, and brought us to this hour.'
            ],
            coptic: [
              'ⲙⲁⲣⲉⲛϣⲉⲡϩⲙⲟⲧ ⲛⲧⲉⲛ ⲡⲓⲣⲉϥⲉⲣⲡⲉⲑⲛⲁⲛⲉϥ ⲟⲩⲟϩ ⲛⲛⲁⲏⲧ Ⲫⲛⲟⲩϯ: ⲫⲓⲱⲧ ⲙⲠⲉⲛϭⲟⲓⲥ ⲟⲩⲟϩ ⲡⲉⲛⲛⲟⲩϯ ⲟⲩⲟϩ ⲡⲉⲛⲥⲱⲧⲏⲣ Ⲓⲏⲥⲟⲩⲥ Ⲡⲭⲣⲓⲥⲧⲟⲥ.',
              'ϫⲉ ⲁϥⲉⲣⲥⲕⲉⲡⲁⲍⲓⲛ ⲉϫⲱⲛ: ⲁϥⲃⲟⲏⲑⲓⲛ ⲉⲣⲟⲛ: ⲁϥⲁⲣⲉϩ ⲉⲣⲟⲛ.'
            ],
            arabic: [
              'فلنشكر صانع الخيرات الرحوم الله، أب ربنا وإلهنا ومخلصنا يسوع المسيح.',
              'لأنه سترنا، وأعاننا، وحفظنا، وقبلنا إليه، وأشفق علينا، وعضدنا، وأتى بنا إلى هذه الساعة.'
            ]
          }
        },
        {
          id: 'item-trisagion',
          role: 'all',
          type: 'hymn',
          title: {
            english: 'The Trisagion (Holy God)',
            coptic: 'Ⲁⲅⲓⲟⲥ ⲟ Ⲑⲉⲟⲥ',
            arabic: 'القداسات الثلاثة'
          },
          user: {
            english: 'People',
            coptic: 'Ⲡⲓⲗⲁⲟⲥ',
            arabic: 'الشعب'
          },
          text: {
            english: [
              'Holy God, Holy Mighty, Holy Immortal, who was born of the Virgin, have mercy on us.',
              'Holy God, Holy Mighty, Holy Immortal, who was crucified for us, have mercy on us.',
              'Holy God, Holy Mighty, Holy Immortal, who rose from the dead and ascended into the heavens, have mercy on us.'
            ],
            coptic: [
              'Ⲁⲅⲓⲟⲥ ⲟ Ⲑⲉⲟⲥ: Ⲁⲅⲓⲟⲥ Ⲓⲥⲭⲩⲣⲟⲥ: Ⲁⲅⲓⲟⲥ Ⲁⲑⲁⲛⲁⲧⲟⲥ: ⲟ ⲉⲕ ⲡⲁⲣⲑⲉⲛⲟⲩ ⲅⲉⲛⲛⲉⲑⲓⲥ: ⲉⲗⲉⲏⲥⲟⲛ ⲏⲙⲁⲥ.',
              'Ⲁⲅⲓⲟⲥ ⲟ Ⲑⲉⲟⲥ: Ⲁⲅⲓⲟⲥ Ⲓⲥⲭⲩⲣⲟⲥ: Ⲁⲅⲓⲟⲥ Ⲁⲑⲁⲛⲁⲧⲟⲥ: ⲟ ⲥⲧⲁⲩⲣⲱⲑⲓⲥ ⲇⲓ ⲏⲙⲁⲥ: ⲉⲗⲉⲏⲥⲟⲛ ⲏⲙⲁⲥ.',
              'Ⲁⲅⲓⲟⲥ ⲟ Ⲑⲉⲟⲥ: Ⲁⲅⲓⲟⲥ Ⲓⲥⲭⲩⲣⲟⲥ: Ⲁⲅⲓⲟⲥ Ⲁⲑⲁⲛⲁⲧⲟⲥ: ⲟ ⲁⲛⲁⲥⲧⲁⲥ ⲉⲕ ⲧⲱⲛ ⲛⲉⲕⲣⲱⲛ: ⲕⲁⲓ ⲁⲛⲉⲗⲑⲱⲛ ⲉⲓⲥ ⲧⲟⲩⲥ ⲟⲩⲣⲁⲛⲟⲩⲥ: ⲉⲗⲉⲏⲥⲟⲛ ⲏⲙⲁⲥ.'
            ],
            arabic: [
              'قدوس الله، قدوس القوي، قدوس الذي لا يموت، الذي ولد من العذراء، ارحمنا.',
              'قدوس الله، قدوس القوي، قدوس الذي لا يموت، الذي صلب عنا، ارحمنا.',
              'قدوس الله، قدوس القوي، قدوس الذي لا يموت، الذي قام من بين الأموات وصعد إلى السماوات، ارحمنا.'
            ]
          }
        }
      ]
    }
  ];
}
