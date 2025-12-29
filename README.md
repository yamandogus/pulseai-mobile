# PulseAI Mobile

PulseAI Mobile, biyometrik ve sağlık verilerini kullanarak kişisel sağlık takibi ve anomali tespiti yapmayı hedefleyen mobil bir uygulama prototipidir. Uygulama, gerçek zamanlı sensör verilerini (ör. kalp atış hızı, adım sayısı) toplayıp makine öğrenimi modelleriyle analiz ederek kullanıcılara durum özetleri, uyarılar ve öneriler sunar.

## Projenin amacı
- Bireylerin günlük sağlık verilerini kolayca takip edebilmelerini sağlamak.
- Sensör verilerinden anlamlı içgörüler çıkararak erken uyarı mekanizmaları sunmak.
- Klinik olmayan ortamlarda sürekli izleme ile kronik durumların veya anormal olayların tespitini desteklemek.
- Kullanıcı gizliliği ve veri güvenliğini ön planda tutarak, yerel ve/veya sunucu tabanlı ML modelleriyle analiz sağlamak.

## Öne çıkan özellikler
- Gerçek zamanlı sensör okuma (kalp atış hızı, ivmeölçer, adım vb.)
- Bulut veya cihaz üzerinde çalışan ML tabanlı anomali tespiti
- Kullanıcıya yönelik özet panolar ve geçmiş veriler
- Uyarı/notification sistemi (anormallik, hedef hatırlatmaları vb.)
- Veri gizliliği odaklı mimari ve şifreli veri depolama (opsiyonel)

## Mimari (yüksek seviyede)
- Mobil istemci: Cihaz sensörlerini okuyup veriyi toplar, ön işlemeler yapar ve gösterge panosunu sunar.
- Analiz katmanı: Basit modeller cihaz üzerinde çalışabilir; daha ağır analizler için güvenli API ile sunucuya gönderim.
- Depolama: Lokal şifreli saklama + isteğe bağlı bulut senkronizasyonu.
- Uyarılar: Anomali tespit edilirse local notification veya push notification ile kullanıcı bilgilendirilir.

## Teknoloji önerileri
(Not: Aşağıdakiler örnektir; repo teknolojisine göre uyarlanmalıdır.)
- Mobil: React Native (Expo) veya native (Kotlin / Swift)
- Backend (opsiyonel): Node.js / Python REST API
- ML: TensorFlow Lite (cihaz içi) veya TensorFlow / PyTorch (sunucu)
- Veri depolama: SQLite, Realm veya Secure Storage
- İletişim: HTTPS + JWT / OAuth2

## Hızlı başlangıç (örnek — repo stack'ine göre güncelle)
1. Gereksinimler:
   - Node.js >= 14
   - yarn veya npm
   - (Eğer Expo kullanılıyorsa) Expo CLI
2. Kurulum:
```bash
git clone https://github.com/yamandogus/pulseai-mobile.git
cd pulseai-mobile
yarn install
```
3. Çalıştırma (örnek Expo):
```bash
yarn expo start
```
4. Konfigürasyon:
- API anahtarları, backend URL'leri ve ML model yolları için `.env` veya benzeri bir yapı kullanın.
- Hassas veriler asla kaynak kod depozitolarına pushlanmamalıdır.

## Veri gizliliği ve güvenlik
- Toplanan sağlık verileri hassas kabul edilmelidir. Kullanıcı izni (explicit consent) gereklidir.
- Veriler cihazda şifrelenmiş biçimde saklanmalı; sunucuya aktarım TLS ile korunmalıdır.
- Anonimleştirme/ülkeye özgü mevzuat (ör. KVKK / GDPR) gereksinimleri göz önünde bulundurulmalıdır.

## Katkıda bulunma
- Yeni özellik önerileri ve hata raporları için [Issues](https://github.com/yamandogus/pulseai-mobile/issues) kullanın.
- Büyük değişiklikler için önce bir issue açıp tartışma başlatın, ardından PR oluşturun.
- Kodlama standartları ve test kapsamı hakkında repo içindeki CONTRIBUTING.md dosyasına bakın (yoksa eklemeyi düşünebiliriz).

## Lisans
Bu proje için uygun lisansı belirtin (örn. MIT, Apache-2.0). Eğer karar vermediyseniz yardımcı olabilirim.

## İletişim
- Proje sahibi: yamandogus
- E-posta / iletişim bilgisi: (isteğe bağlı ekleyin)
