// Documentations

type Operation = {
  operation: string;
  result: string;
  description: string;
};

export type Documentation = {
  squareRoot: Operation[];
  square: Operation[];
  multiple: Operation[];
  divide: Operation[];
  sum: Operation[];
  subtraction: Operation[];
};

type tabTypes = {
  key: keyof Documentation,
  title: string
}

export const tabs: tabTypes[] = [
  {
    title: 'Akar Kuadrat (sqrt{nilai})',
    key: 'squareRoot'
  },
  {
    title: 'Pangkat (n^{x})',
    key: 'square'
  },
  {
    title: 'Perkalian (*/.)',
    key: 'multiple'
  },
  {
    title: 'Pembagian (/)',
    key: 'divide'
  },
  {
    title: 'Penjumlahan (+)',
    key: 'sum'
  },
  {
    title: 'Pengurangan (-)',
    key: 'subtraction'
  },
]

export const documentation: Documentation = {
  squareRoot: [
    {
      operation: 'sqrt{4}',
      result: '$\\sqrt[]{4}$',
      description: 'Operasi akar bernilai 4 didalamnya.'
    },
    {
      operation: 'sqrt{x}',
      result: '$\\sqrt[]{x}$',
      description: 'Operasi akar bernilai variabel x didalamnya.'
    },
    {
      operation: 'sqrt{y^{2-x}}',
      result: '$\\sqrt[]{y^{2-x}}$',
      description: 'Operasi akar yang bernilai y pangkat 2 - x.'
    },
  ],
  square: [
    {
      operation: '4^2',
      result: '$4^{2}$',
      description: 'Operasi bilangan 4 berpangkat kuadrat.'
    },
    {
      operation: 'x^{sqrt{y}}',
      result: '$x^{\\sqrt[]{2}}$',
      description: 'Operasi pangkat yang pangkatnya memiliki nilai akar.'
    },
    {
      operation: '4^{x^{2}}',
      result: '$4^{x^{2}}$',
      description: 'Operasi bilangan pangkat dimana pangkat x mempunyai pangkat kembali yang bernilai 2.'
    },
  ],
  multiple: [
    {
      operation: '2xyz',
      result: '$2xyz$',
      description: 'Operasi perkalian bisa langsung tanpa simbol dengan syarat ada variabel yang berbeda.'
    },
    {
      operation: '2x*y*z',
      result: '$2x*y*z$',
      description: 'Operasi perkalian pada umumnya menggunakan simbol bintang (*).'
    },
    {
      operation: '2x.y.z',
      result: '$2x\\cdot y\\cdot z$',
      description: 'Operasi perkalian pada umumnya menggunakan simbol titik (.).'
    },
    {
      operation: 'x^{2}yz^{x}',
      result: '$x^{2}yz^{x}$',
      description: 'Operasi perkalian dengan pangkat.'
    },
  ],
  divide: [
    {
      operation: '1/2',
      result: '$\\frac{1}{2}$',
      description: 'Operasi pembagian pada umumnya.'
    },
    {
      operation: '1+2/2',
      result: '$1+\\frac{1}{2}$',
      description: 'Operasi penjumlahan dan pembagian.'
    },
    {
      operation: '{1+2}/{3+x^{x}}',
      result: '$1+\\frac{1+2}{3+x^{x}}$',
      description: 'Operasi penjumlahan dan pembagian dengan bilangan kompleks.'
    },
    {
      operation: '2x/2y',
      result: '$\\frac{2x}{2y}$',
      description: 'Operasi pembagian dua buah variabel.'
    },
  ],
  sum: [
    {
      operation: '2x+2y^{2}',
      result: '$2x+2y^{2}$',
      description: 'Operasi penjumlahan dua buah variabel pada umumnya dengan variabel 2y berpangkat kuadrat.'
    },
    {
      operation: '2x+2y+3z^{6y}',
      result: '$2x+2y+3z^{6y}$',
      description: 'Operasi penjumlahan dengan terdapat pangkat bernilai variabel didalamnya.'
    },
  ],
  subtraction: [
    {
      operation: '2x-2z^{-1}',
      result: '$2x-2z^{-1}$',
      description: 'Operasi pengurangan dua buah variabel pada umumnya dengan variabel 2z berpangkat -1.'
    },
    {
      operation: '2x-2y^{x}+3z^{7-z}',
      result: '$2x-2y+3z^{7-z}$',
      description: 'Operasi pengurangan dengan terdapat pangkat bernilai variabel didalamnya.'
    },
  ]
}