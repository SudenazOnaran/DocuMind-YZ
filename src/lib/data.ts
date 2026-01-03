
import type { User, Folder, Document } from './types';

export const mockUser: User = {
  id: 'user-1',
  name: 'Demo Kullanıcı',
  email: 'demo@example.com',
};

export const mockFolders: Folder[] = [
  { id: 'folder-1', name: 'Araştırma Makaleleri' },
  { id: 'folder-2', name: 'Proje Notları' },
  { id: 'folder-3', name: 'Toplantı Tutanakları' },
];

export const mockDocuments: Document[] = [
  {
    id: 'doc-1',
    title: 'Kuantum Bilişimin Temelleri',
    folderId: 'folder-1',
    createdAt: '2024-05-10T10:00:00Z',
    content: `Kuantum bilişim, klasik bilişimin temelini oluşturan bitlerin aksine, kuantum mekaniği fenomenlerini (süperpozisyon ve dolanıklık gibi) kullanarak verileri işleyen bir hesaplama türüdür. Kuantum bilgisayarlarının temel yapı taşı kübittir. Bir bit 0 ya da 1 değerini alabilirken, bir kübit aynı anda hem 0 hem de 1 durumunda olabilir. Bu özellik, kuantum bilgisayarların belirli türdeki problemleri, özellikle de optimizasyon ve kriptografi gibi alanlardaki sorunları, klasik bilgisayarlara göre çok daha hızlı çözme potansiyeli sunar. Shor ve Grover algoritmaları, kuantum bilişimin bu potansiyelini ortaya koyan en bilinen örneklerdendir. Ancak, kuantum bilgisayarlar hala gelişim aşamasındadır ve "kuantum üstünlüğü" olarak adlandırılan noktaya ulaşmak için önemli teknolojik engellerin aşılması gerekmektedir.`
  },
  {
    id: 'doc-2',
    title: 'Proje Delta Başlangıç Toplantısı',
    folderId: 'folder-2',
    createdAt: '2024-05-09T14:30:00Z',
    content: `Proje Delta'nın başlangıç toplantısı 9 Mayıs 2024 tarihinde gerçekleştirildi. Toplantıya proje ekibinin tamamı katıldı. Projenin ana hedefleri, zaman çizelgesi ve bütçesi tartışıldı. Ana hedef, 2024 sonuna kadar yeni müşteri ilişkileri yönetimi (CRM) platformunu devreye almaktır. Proje üç ana fazdan oluşacaktır: Analiz ve Tasarım (Haziran-Temmuz), Geliştirme (Ağustos-Ekim), Test ve Dağıtım (Kasım-Aralık). Riskler bölümünde, olası entegrasyon sorunları ve personel eksikliği belirtildi. Bütçe olarak 500.000 TL ayrılmıştır.`
  },
  {
    id: 'doc-3',
    title: 'Yapay Sinir Ağları ve Derin Öğrenme',
    folderId: 'folder-1',
    createdAt: '2024-05-08T11:00:00Z',
    content: `Yapay sinir ağları (YSA), insan beyninin çalışma şeklinden esinlenerek geliştirilmiş bir makine öğrenmesi modelidir. Birçok katmandan oluşan bu ağlar, "nöron" adı verilen işlem birimlerinden oluşur. Derin öğrenme, çok sayıda katmana sahip (derin) yapay sinir ağlarını kullanan bir YSA alt alanıdır. Bu derin yapı, modelin verilerden hiyerarşik ve karmaşık özellikleri öğrenmesini sağlar. Görüntü tanıma, doğal dil işleme ve otonom sürüş gibi birçok alanda devrim yaratmıştır. Evrişimli Sinir Ağları (CNN) ve Tekrarlayan Sinir Ağları (RNN) en yaygın derin öğrenme mimarilerindendir.`
  },
  {
    id: 'doc-4',
    title: 'Pazarlama Stratejisi Q2 2024',
    folderId: 'folder-3',
    createdAt: '2024-04-20T09:00:00Z',
    content: `2024'ün ikinci çeyreği için pazarlama stratejimiz üç ana sütuna odaklanacaktır: içerik pazarlaması, sosyal medya etkileşimi ve e-posta kampanyaları. İçerik pazarlaması kapsamında, haftada iki blog yazısı ve ayda bir teknik inceleme yayınlanacaktır. Sosyal medya tarafında, LinkedIn ve Twitter'da hedef kitlemize yönelik etkileşimi artırıcı paylaşımlar ve anketler düzenlenecektir. E-posta kampanyaları ile mevcut müşterilere yeni ürün özellikleri tanıtılacak ve potansiyel müşterilere özel indirimler sunulacaktır. Başarı metrikleri olarak web sitesi trafiği, dönüşüm oranları ve sosyal medya etkileşim oranları takip edilecektir.`
  },
];
