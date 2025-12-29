import { Ionicons } from '@expo/vector-icons';
// Geliştirilmiş Task Tipi
export type Subtask = {
    id: string;
    title: string;
    checked: boolean;
};

export type Task = {
    id: string;
    title: string;
    description?: string;
    priority: 'Yüksek' | 'Orta' | 'Düşük';
    status: 'Beklemede' | 'Devam Ediyor' | 'Tamamlandı';
    category: 'Toplantı' | 'Geliştirme' | 'Tasarım' | 'Rapor' | 'Planlama' | 'İletişim' | 'Test' | 'Diğer';
    dueDate: string;
    time?: string;
    location?: string;
    subtasks?: Subtask[];
    tags?: string[];
    assignee?: string;
    progress?: number;
    aiSuggestion?: string;
    checked: boolean;
};

// Kategori ikonları
export const getCategoryIcon = (category: string): keyof typeof Ionicons.glyphMap => {
    switch (category) {
        case 'Toplantı': return 'people';
        case 'Geliştirme': return 'code-slash';
        case 'Tasarım': return 'color-palette';
        case 'Rapor': return 'document-text';
        case 'Planlama': return 'calendar';
        case 'İletişim': return 'chatbubbles';
        case 'Test': return 'bug';
        default: return 'ellipse';
    }
};

// 20 Zenginleştirilmiş Dummy Task
export const dummyTasks: Task[] = [
    {
        id: '1',
        title: 'Q4 Strateji Sunumu Hazırla',
        description: 'Yıl sonu hedeflerini ve 2025 planlarını içeren sunum hazırlanacak.',
        priority: 'Yüksek',
        status: 'Devam Ediyor',
        category: 'Rapor',
        dueDate: 'Bugün',
        time: '10:00 - 12:00',
        location: 'Ofis',
        subtasks: [
            { id: '1-1', title: 'Veri analizi yap', checked: true },
            { id: '1-2', title: 'Grafikleri hazırla', checked: true },
            { id: '1-3', title: 'Sunum tasarımı', checked: false },
            { id: '1-4', title: 'Son kontrol', checked: false },
        ],
        tags: ['Sunum', 'Strateji', 'Q4'],
        assignee: 'Doğuş',
        progress: 50,
        aiSuggestion: 'Şimdi odaklanmak için en iyi zaman.',
        checked: false,
    },
    {
        id: '2',
        title: 'Tasarım Ekibi Sprint Toplantısı',
        description: 'Haftalık sprint değerlendirmesi ve sonraki hafta planlaması.',
        priority: 'Orta',
        status: 'Beklemede',
        category: 'Toplantı',
        dueDate: 'Bugün',
        time: '14:00 - 15:00',
        location: 'Toplantı Odası B',
        tags: ['Sprint', 'Tasarım'],
        assignee: 'Ekip',
        checked: false,
    },
    {
        id: '3',
        title: 'Mobil Uygulama Dark Mode',
        description: 'React Native uygulaması için dark mode implementasyonu.',
        priority: 'Yüksek',
        status: 'Tamamlandı',
        category: 'Geliştirme',
        dueDate: 'Bugün',
        subtasks: [
            { id: '3-1', title: 'ThemeContext oluştur', checked: true },
            { id: '3-2', title: 'Renk paleti tanımla', checked: true },
            { id: '3-3', title: 'Componentlere uygula', checked: true },
        ],
        tags: ['React Native', 'UI'],
        progress: 100,
        checked: true,
    },
    {
        id: '4',
        title: 'Müşteri Geri Bildirimi Analizi',
        description: 'Son 30 günlük müşteri yorumlarını analiz et ve rapor hazırla.',
        priority: 'Orta',
        status: 'Devam Ediyor',
        category: 'Rapor',
        dueDate: 'Yarın',
        time: '09:00 - 11:00',
        subtasks: [
            { id: '4-1', title: 'Verileri topla', checked: true },
            { id: '4-2', title: 'Kategorizasyon yap', checked: false },
            { id: '4-3', title: 'Rapor yaz', checked: false },
        ],
        tags: ['Analiz', 'Müşteri'],
        progress: 33,
        checked: false,
    },
    {
        id: '5',
        title: 'API Endpoint Güvenlik Testi',
        description: 'Tüm public API endpointleri için güvenlik testi yapılacak.',
        priority: 'Yüksek',
        status: 'Beklemede',
        category: 'Test',
        dueDate: 'Yarın',
        time: '13:00 - 17:00',
        location: 'Ofis',
        tags: ['Güvenlik', 'API', 'Test'],
        assignee: 'Ali',
        aiSuggestion: 'OWASP kontrol listesini kullan.',
        checked: false,
    },
    {
        id: '6',
        title: 'Yeni Onboarding Akışı Tasarımı',
        description: 'Kullanıcı kayıt sürecini iyileştirmek için yeni tasarım.',
        priority: 'Orta',
        status: 'Devam Ediyor',
        category: 'Tasarım',
        dueDate: 'Bu Hafta',
        subtasks: [
            { id: '6-1', title: 'Kullanıcı araştırması', checked: true },
            { id: '6-2', title: 'Wireframe çiz', checked: true },
            { id: '6-3', title: 'Prototip oluştur', checked: false },
            { id: '6-4', title: 'Kullanıcı testi', checked: false },
        ],
        tags: ['UX', 'Onboarding'],
        progress: 50,
        checked: false,
    },
    {
        id: '7',
        title: 'Haftalık Standup',
        description: 'Ekip ile haftalık ilerleme paylaşımı.',
        priority: 'Düşük',
        status: 'Tamamlandı',
        category: 'Toplantı',
        dueDate: 'Bugün',
        time: '09:30 - 10:00',
        location: 'Zoom',
        tags: ['Standup'],
        checked: true,
    },
    {
        id: '8',
        title: 'Database Performans Optimizasyonu',
        description: 'Yavaş sorguları tespit et ve optimize et.',
        priority: 'Yüksek',
        status: 'Beklemede',
        category: 'Geliştirme',
        dueDate: 'Bu Hafta',
        subtasks: [
            { id: '8-1', title: 'Slow query log analizi', checked: false },
            { id: '8-2', title: 'Index optimizasyonu', checked: false },
            { id: '8-3', title: 'Query refactoring', checked: false },
        ],
        tags: ['Database', 'Performans'],
        assignee: 'Mehmet',
        checked: false,
    },
    {
        id: '9',
        title: 'Müşteri Demo Sunumu',
        description: 'Yeni özelliklerin müşteriye tanıtımı.',
        priority: 'Yüksek',
        status: 'Beklemede',
        category: 'Toplantı',
        dueDate: 'Perşembe',
        time: '15:00 - 16:00',
        location: 'Konferans Salonu',
        tags: ['Demo', 'Müşteri'],
        assignee: 'Doğuş',
        aiSuggestion: 'Sunumu önceden test et.',
        checked: false,
    },
    {
        id: '10',
        title: 'Code Review: Payment Module',
        description: 'Ödeme modülü PR incelemesi.',
        priority: 'Orta',
        status: 'Devam Ediyor',
        category: 'Geliştirme',
        dueDate: 'Bugün',
        tags: ['Code Review', 'Payment'],
        progress: 75,
        checked: false,
    },
    {
        id: '11',
        title: 'Aylık Bütçe Raporu',
        description: 'Aralık ayı harcama raporu hazırla.',
        priority: 'Düşük',
        status: 'Beklemede',
        category: 'Rapor',
        dueDate: 'Cuma',
        tags: ['Finans', 'Rapor'],
        checked: false,
    },
    {
        id: '12',
        title: 'Push Notification Entegrasyonu',
        description: 'Firebase Cloud Messaging entegrasyonu.',
        priority: 'Orta',
        status: 'Devam Ediyor',
        category: 'Geliştirme',
        dueDate: 'Bu Hafta',
        subtasks: [
            { id: '12-1', title: 'Firebase kurulumu', checked: true },
            { id: '12-2', title: 'Token yönetimi', checked: true },
            { id: '12-3', title: 'Bildirim gösterimi', checked: false },
            { id: '12-4', title: 'Test', checked: false },
        ],
        tags: ['Firebase', 'Notification'],
        progress: 50,
        checked: false,
    },
    {
        id: '13',
        title: 'Kullanıcı Memnuniyeti Anketi',
        description: 'Q4 kullanıcı memnuniyeti anketini gönder.',
        priority: 'Düşük',
        status: 'Beklemede',
        category: 'İletişim',
        dueDate: 'Gelecek Hafta',
        tags: ['Anket', 'Kullanıcı'],
        checked: false,
    },
    {
        id: '14',
        title: 'CI/CD Pipeline Güncellemesi',
        description: 'GitHub Actions workflow güncelleme.',
        priority: 'Orta',
        status: 'Tamamlandı',
        category: 'Geliştirme',
        dueDate: 'Dün',
        tags: ['CI/CD', 'DevOps'],
        progress: 100,
        checked: true,
    },
    {
        id: '15',
        title: '2025 Yol Haritası Planlaması',
        description: 'Ürün ekibi ile yeni yıl planlaması.',
        priority: 'Yüksek',
        status: 'Beklemede',
        category: 'Planlama',
        dueDate: 'Gelecek Hafta',
        time: '10:00 - 12:00',
        location: 'Toplantı Odası A',
        tags: ['Planlama', '2025'],
        assignee: 'Tüm Ekip',
        checked: false,
    },
    {
        id: '16',
        title: 'Mobil App Store Güncellemesi',
        description: 'App Store ve Play Store açıklamalarını güncelle.',
        priority: 'Düşük',
        status: 'Beklemede',
        category: 'Diğer',
        dueDate: 'Bu Hafta',
        subtasks: [
            { id: '16-1', title: 'Screenshots güncelle', checked: false },
            { id: '16-2', title: 'Açıklama yaz', checked: false },
            { id: '16-3', title: 'Yayınla', checked: false },
        ],
        tags: ['App Store', 'Marketing'],
        checked: false,
    },
    {
        id: '17',
        title: 'A/B Test Sonuçları Analizi',
        description: 'Checkout akışı A/B test sonuçlarını değerlendir.',
        priority: 'Orta',
        status: 'Devam Ediyor',
        category: 'Rapor',
        dueDate: 'Perşembe',
        tags: ['A/B Test', 'Analiz'],
        progress: 60,
        aiSuggestion: 'Conversion rate artışına odaklan.',
        checked: false,
    },
    {
        id: '18',
        title: 'Ekip Motivasyon Etkinliği',
        description: 'Yıl sonu kutlama etkinliği organizasyonu.',
        priority: 'Düşük',
        status: 'Beklemede',
        category: 'Diğer',
        dueDate: '31 Aralık',
        time: '18:00 - 21:00',
        location: 'Restoran',
        tags: ['Etkinlik', 'Sosyal'],
        checked: false,
    },
    {
        id: '19',
        title: 'Accessibility Audit',
        description: 'WCAG 2.1 uyumluluk kontrolü.',
        priority: 'Orta',
        status: 'Beklemede',
        category: 'Test',
        dueDate: 'Gelecek Hafta',
        subtasks: [
            { id: '19-1', title: 'Lighthouse audit', checked: false },
            { id: '19-2', title: 'Screen reader testi', checked: false },
            { id: '19-3', title: 'Rapor hazırla', checked: false },
        ],
        tags: ['Accessibility', 'WCAG'],
        checked: false,
    },
    {
        id: '20',
        title: 'Haftalık Blog Yazısı',
        description: 'Teknoloji blogu için yeni içerik.',
        priority: 'Düşük',
        status: 'Beklemede',
        category: 'İletişim',
        dueDate: 'Cuma',
        tags: ['Blog', 'İçerik'],
        checked: false,
    },
];

export const getPriorityColor = (priority: string, isDark: boolean) => {
    switch (priority) {
        case 'Yüksek':
            return { bg: isDark ? '#7F1D1D' : '#FEF2F2', text: isDark ? '#FCA5A5' : '#DC2626' };
        case 'Orta':
            return { bg: isDark ? '#78350F' : '#FFF7ED', text: isDark ? '#FCD34D' : '#EA580C' };
        case 'Düşük':
            return { bg: isDark ? '#14532D' : '#F0FDF4', text: isDark ? '#86EFAC' : '#16A34A' };
        default:
            return { bg: isDark ? '#374151' : '#F3F4F6', text: isDark ? '#9CA3AF' : '#6B7280' };
    }
};

export const getStatusColor = (status: string, isDark: boolean) => {
    switch (status) {
        case 'Tamamlandı':
            return { bg: isDark ? '#14532D' : '#DCFCE7', text: isDark ? '#86EFAC' : '#15803D' };
        case 'Devam Ediyor':
            return { bg: isDark ? '#1E3A5F' : '#DBEAFE', text: isDark ? '#93C5FD' : '#1D4ED8' };
        case 'Beklemede':
            return { bg: isDark ? '#374151' : '#F3F4F6', text: isDark ? '#9CA3AF' : '#6B7280' };
        default:
            return { bg: isDark ? '#374151' : '#F3F4F6', text: isDark ? '#9CA3AF' : '#6B7280' };
    }
};
