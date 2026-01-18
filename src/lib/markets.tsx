import { MarketTag, MarketOption } from '@/components/cards/market-card';

export interface Market {
  id: number;
  createdAt: string;
  title: string;
  timeRemaining: string;
  volume: string;
  type:
    | 'multiple-choice'
    | 'binary'
    | 'binary-buttons'
    | 'match-outcome-buttons';
  tags: MarketTag[];
  mainOption?: string;
  options?: MarketOption[];
  percentage?: number;
  leftLogo?: string;
  rightLogo?: string;
  image?: string;
  conditionId?: string; // For binary markets orderbook
  yesTokenId?: string;
  noTokenId?: string;
}

export const marketData: Market[] = [
  {
    id: 1,
    createdAt: '2023-10-01',
    title: 'Who will win US Election',
    timeRemaining: '2d:3h:23m',
    volume: '$322.1m',
    type: 'multiple-choice',
    tags: ['Politics'],
    image:
      'https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg',
    options: [
      {
        name: 'Donald Trump',
        percentage: 40,
        photo:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Donald_Trump_official_portrait.jpg/220px-Donald_Trump_official_portrait.jpg',
      },
      {
        name: 'Kamala Harris',
        percentage: 30,
        photo:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Kamala_Harris_Vice_Presidential_Portrait.jpg/220px-Kamala_Harris_Vice_Presidential_Portrait.jpg',
      },
      {
        name: 'Robert F. Kennedy Jr.',
        percentage: 12,
        photo:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Kamala_Harris_Vice_Presidential_Portrait.jpg/220px-Kamala_Harris_Vice_Presidential_Portrait.jpg',
      },
      {
        name: 'Elon',
        percentage: 10,
        photo:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Kamala_Harris_Vice_Presidential_Portrait.jpg/220px-Kamala_Harris_Vice_Presidential_Portrait.jpg',
      },
      {
        name: 'Kanye West',
        percentage: 5,
        photo:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Kamala_Harris_Vice_Presidential_Portrait.jpg/220px-Kamala_Harris_Vice_Presidential_Portrait.jpg',
      },
      {
        name: 'Joe Biden',
        percentage: 3,
        photo:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Kamala_Harris_Vice_Presidential_Portrait.jpg/220px-Kamala_Harris_Vice_Presidential_Portrait.jpg',
      },
    ],
  },
  {
    id: 2,
    createdAt: '2023-10-02',
    title: 'Man Utd vs Newcastle',
    timeRemaining: '2d:3h:23m',
    volume: '$322.1m',
    type: 'match-outcome-buttons',
    tags: ['Sports'],
    leftLogo:
      'https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg',
    rightLogo:
      'https://upload.wikimedia.org/wikipedia/en/5/56/Newcastle_United_Logo.svg',
    options: [
      { name: 'Manchester United', shortName: 'Man Utd', percentage: 64 },
      { name: 'Newcastle', percentage: 20 },
    ],
  },
  {
    id: 3,
    createdAt: '2023-10-03',
    title: 'Will Bitcoin reach $100k by end of 2025?',
    timeRemaining: '2d:3h:23m',
    volume: '$322.1m',
    type: 'binary-buttons',
    tags: ['Crypto', 'Finance'],
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/220px-Bitcoin.svg.png',
    percentage: 74,
  },
  {
    id: 4,
    createdAt: '2023-10-04',
    title: 'Will the Fed cut rates in Q1 2025?',
    timeRemaining: '2d:3h:23m',
    volume: '$322.1m',
    type: 'binary-buttons',
    tags: ['Finance'],
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Seal_of_the_United_States_Federal_Reserve_System.svg/220px-Seal_of_the_United_States_Federal_Reserve_System.svg.png',
    percentage: 49,
  },
  {
    id: 5,
    createdAt: '2023-10-05',
    title: 'Who will win the Oscars Best Picture?',
    timeRemaining: '2d:3h:23m',
    volume: '$322.1m',
    type: 'multiple-choice',
    tags: ['Entertainment'],
    options: [
      {
        name: 'Oppenheimer',
        percentage: 54,
        photo:
          'https://upload.wikimedia.org/wikipedia/en/4/4a/Oppenheimer_%28film%29.jpg',
      },
      {
        name: 'Barbie',
        percentage: 46,
        photo:
          'https://upload.wikimedia.org/wikipedia/en/0/0b/Barbie_poster.jpg',
      },
      {
        name: 'Poor Things',
        percentage: 6,
        photo:
          'https://upload.wikimedia.org/wikipedia/en/9/98/Poor_Things_film_poster.jpg',
      },
      { name: 'Other', percentage: 4 },
    ],
  },
  {
    id: 6,
    createdAt: '2023-10-06',
    title: 'Will Apple stock reach $250 in 2025?',
    timeRemaining: '2d:3h:23m',
    volume: '$322.1m',
    type: 'binary-buttons',
    tags: ['Companies', 'Finance'],
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/220px-Apple_logo_black.svg.png',
    percentage: 54,
  },
  {
    id: 7,
    createdAt: '2023-10-07',
    title: 'Global temperature increase above 1.5°C by 2030?',
    timeRemaining: '2d:3h:23m',
    volume: '$322.1m',
    type: 'binary-buttons',
    tags: ['Climate'],
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Atmospheric_Transmission_ZH.png/220px-Atmospheric_Transmission_ZH.png',
    percentage: 67,
  },
  {
    id: 8,
    createdAt: '2023-10-08',
    title: 'Will Ethereum move to $5000 this year?',
    timeRemaining: '2d:3h:23m',
    volume: '$322.1m',
    type: 'binary-buttons',
    tags: ['Crypto', 'Finance'],
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/220px-Ethereum-icon-purple.svg.png',
    percentage: 54,
  },
  {
    id: 9,
    createdAt: '2023-10-09',
    title: 'Lakers vs Celtics',
    timeRemaining: '2d:3h:23m',
    volume: '$322.1m',
    type: 'match-outcome-buttons',
    tags: ['Sports'],
    leftLogo:
      'https://upload.wikimedia.org/wikipedia/commons/3/3c/Los_Angeles_Lakers_logo.svg',
    rightLogo:
      'https://upload.wikimedia.org/wikipedia/en/8/8f/Boston_Celtics.svg',
    options: [
      { name: 'Los Angeles Lakers', shortName: 'Lakers', percentage: 48 },
      { name: 'Boston Celtics', shortName: 'Celtics', percentage: 52 },
    ],
  },
  {
    id: 10,
    createdAt: '2023-10-10',
    title: 'Will Tesla announce new model in 2025?',
    timeRemaining: '2d:3h:23m',
    volume: '$322.1m',
    type: 'binary-buttons',
    tags: ['Companies'],
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Tesla_Motors.svg/220px-Tesla_Motors.svg.png',
    percentage: 63,
  },
  {
    id: 11,
    createdAt: '2023-10-11',
    title: 'Next UK Prime Minister',
    timeRemaining: '2d:3h:23m',
    volume: '$322.1m',
    type: 'multiple-choice',
    tags: ['Politics'],
    options: [
      {
        name: 'Keir Starmer',
        percentage: 46,
        photo:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Official_portrait_of_Keir_Starmer_crop_2.jpg/220px-Official_portrait_of_Keir_Starmer_crop_2.jpg',
      },
      {
        name: 'Rishi Sunak',
        percentage: 32,
        photo:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Official_portrait_of_Rt_Hon_Rishi_Sunak_MP_crop_2.jpg/220px-Official_portrait_of_Rt_Hon_Rishi_Sunak_MP_crop_2.jpg',
      },
      { name: 'Other', percentage: 22 },
    ],
  },
  {
    id: 12,
    createdAt: '2023-10-12',
    title: 'Will Netflix reach 300M subscribers?',
    timeRemaining: '2d:3h:23m',
    volume: '$322.1m',
    type: 'binary-buttons',
    tags: ['Entertainment', 'Companies'],
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/220px-Netflix_2015_logo.svg.png',
    percentage: 71,
  },
  {
    id: 13,
    createdAt: '2023-10-13',
    title: 'Arsenal vs Chelsea',
    timeRemaining: '2d:3h:23m',
    volume: '$322.1m',
    type: 'match-outcome-buttons',
    tags: ['Sports'],
    leftLogo: 'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg',
    rightLogo: 'https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg',
    options: [
      { name: 'Arsenal', percentage: 55 },
      { name: 'Chelsea', percentage: 28 },
    ],
  },
  {
    id: 14,
    createdAt: '2023-10-14',
    title: 'Will Amazon split stock in 2025?',
    timeRemaining: '2d:3h:23m',
    volume: '$322.1m',
    type: 'binary-buttons',
    tags: ['Companies', 'Finance'],
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/220px-Amazon_logo.svg.png',
    percentage: 38,
  },
  {
    id: 15,
    createdAt: '2023-10-15',
    title: 'US solar capacity to double by 2026?',
    timeRemaining: '2d:3h:23m',
    volume: '$322.1m',
    type: 'binary-buttons',
    tags: ['Climate', 'Finance'],
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Photovoltaik_Dach_fg_2b.jpg/220px-Photovoltaik_Dach_fg_2b.jpg',
    percentage: 56,
  },
];

export function getMarketSlug(market: Market): string {
  const nameSlug = market.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return `${nameSlug}_${market.createdAt}_${market.id}`;
}
