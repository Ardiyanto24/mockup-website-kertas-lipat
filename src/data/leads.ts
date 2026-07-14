export interface Lead {
  id: string;
  type: 'checkout' | 'contact';
  timestamp: string;
  name: string;
  phone: string;
  
  // Fields for checkout type
  address?: string;
  notes?: string;
  items?: {
    name: string;
    sku: string;
    quantity: number;
    unit: string;
    variantName: string;
    needDesignService: boolean;
    addons: { name: string; price: number }[];
    total: number;
  }[];
  totalPrice?: number;
  uploadedFileName?: string;
  uploadedFileSize?: string;
  
  // Fields for contact type
  organization?: string;
  category?: string;
  quantityAndBudget?: string;
  message?: string;
}

export const dummyLeads: Lead[] = [
  {
    id: 'lead_dummy_1',
    type: 'checkout',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
    name: 'Budi Santoso',
    phone: '081234567890',
    address: 'Jl. Merdeka No. 45, Kecamatan Sumur Bandung, Kota Bandung, Jawa Barat 40111',
    notes: 'Mohon agar barang dikirim sebelum jam 3 sore karena kantor tutup.',
    items: [
      {
        name: 'Brosur Lipat Tiga HVS',
        sku: 'KL-PRT-01',
        quantity: 500,
        unit: 'lembar',
        variantName: 'Bahan HVS 80gr',
        needDesignService: true,
        addons: [
          { name: 'Laminasi Protektif Premium', price: 1500 }
        ],
        total: 325000
      }
    ],
    totalPrice: 375000,
    uploadedFileName: 'design_brosur_draft_final.zip',
    uploadedFileSize: '4.2 MB'
  },
  {
    id: 'lead_dummy_2',
    type: 'contact',
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2 hours ago
    name: 'Siti Aminah',
    phone: '085789012345',
    organization: 'Panitia Alumni SMA 1 Bandung',
    category: 'Buku Tahunan Sekolah',
    quantityAndBudget: '150 Buku / Budget Rp 20.000.000',
    message: 'Halo admin Kertas Lipat, kami berencana mencetak buku tahunan sekolah untuk angkatan 2026. Kami butuh konsultasi mengenai mockup cover hardcover timbul/embossed dan laminasi doff.'
  },
  {
    id: 'lead_dummy_3',
    type: 'checkout',
    timestamp: new Date(Date.now() - 1000 * 60 * 600).toISOString(), // 10 hours ago
    name: 'Denny Wijaya',
    phone: '089912345678',
    address: 'Ruko Paskal Hyper Square Blok B No. 12, Kota Bandung, Jawa Barat 40181',
    notes: '',
    items: [
      {
        name: 'Kartu Nama Premium Doff',
        sku: 'KL-PRT-03',
        quantity: 3,
        unit: 'box',
        variantName: 'Art Carton 260gr + Doff',
        needDesignService: false,
        addons: [],
        total: 135000
      }
    ],
    totalPrice: 135000
  }
];
