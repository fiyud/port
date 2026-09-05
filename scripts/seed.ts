import { auth } from '../lib/auth'
import { db } from '../lib/db'
import {
  profile,
  experience,
  publications,
  education,
  awards,
} from '../lib/db/schema'

const ADMIN_EMAIL = 'admin@quanganh.dev'
const ADMIN_PASSWORD = 'ChangeMe123!'
const ADMIN_NAME = 'Nguyen Duong Quang-Anh'

async function main() {
  console.log('[v0] Seeding admin user...')

  let userId: string

  const existing = await auth.api
    .signInEmail({ body: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD } })
    .catch(() => null)

  if (existing?.user) {
    userId = existing.user.id
    console.log('[v0] Admin user already exists, reusing:', userId)
  } else {
    const created = await auth.api.signUpEmail({
      body: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD, name: ADMIN_NAME },
    })
    userId = created.user.id
    console.log('[v0] Created admin user:', userId)
  }

  console.log('[v0] Seeding profile...')
  await db.insert(profile).values({
    userId,
    fullName: 'Quang-Anh N. D.',
    title: 'AI Researcher',
    tagline:
      'Multidisciplinary machine learning research across biomedical AI, robotics, WiFi sensing, and environmental intelligence.',
    bio: `Quang-Anh N. D. is a Bachelor of Applied Information Technology candidate at the International School, Vietnam National University, Hanoi. His experience includes positions at the ICAI Lab and CVR Lab in 2024, and Cognibotics Lab with the University of Arkansas in 2025; he also serves as a Research Assistant at CEI-VinUni in 2026. He currently serves as a Visiting Scholar at Middlesex University. His research interests focus on multidisciplinary machine learning applications, spanning WiFi-based pose estimation, biomedical signal analysis, visual navigation, and environmental forecasting.`,
    email: 'chotala1113@gmail.com',
    phone: '0948396862',
    location: 'Hanoi, Vietnam',
    linkedin: 'https://linkedin.com/in/fiyud/',
    github: 'https://github.com/fiyud',
    scholar: '',
  })

  console.log('[v0] Seeding research experience...')
  await db.insert(experience).values([
    {
      userId,
      category: 'research',
      role: 'Researcher',
      organization: 'Intelligent Control and Artificial Intelligence Laboratory — VNUIS',
      location: 'Hanoi, Vietnam',
      startDate: '01/2023',
      endDate: '08/2024',
      description: '',
      sortOrder: 0,
    },
    {
      userId,
      category: 'research',
      role: 'Researcher',
      organization: 'AI4DS Lab — VNUIS',
      location: 'Hanoi, Vietnam',
      startDate: '10/2024',
      endDate: '12/2025',
      description: '',
      sortOrder: 1,
    },
    {
      userId,
      category: 'research',
      role: 'Researcher',
      organization: 'AIBioMed Lab — Taipei Medical University',
      location: 'Taipei, Taiwan',
      startDate: '07/2025',
      endDate: '01/2026',
      description: '',
      sortOrder: 2,
    },
    {
      userId,
      category: 'research',
      role: 'Researcher',
      organization: 'Cognitive Machine Intelligence Laboratory — VNUIS',
      location: 'Hanoi, Vietnam',
      startDate: '08/2024',
      endDate: '05/2026',
      description: '',
      sortOrder: 3,
    },
    {
      userId,
      category: 'research',
      role: 'Researcher',
      organization: 'Computer Vision and Robotics Laboratory — VNUIS',
      location: 'Hanoi, Vietnam',
      startDate: '08/2024',
      endDate: '05/2026',
      description: '',
      sortOrder: 4,
    },
    {
      userId,
      category: 'research',
      role: 'Research Intern',
      organization: 'Cognitive Robotics Lab — University of Arkansas',
      location: 'Arkansas, USA',
      startDate: '05/2025',
      endDate: '05/2026',
      description: '',
      sortOrder: 5,
    },
    {
      userId,
      category: 'research',
      role: 'Research Assistant',
      organization: 'Center for Environmental Intelligence — VinUniversity',
      location: 'Hanoi, Vietnam',
      startDate: '11/2025',
      endDate: '05/2026',
      description: '',
      sortOrder: 6,
    },
    {
      userId,
      category: 'research',
      role: 'Research Scholar',
      organization: 'London Digital Twin Research Centre — Middlesex University',
      location: 'London, UK',
      startDate: '01/2026',
      endDate: 'Ongoing',
      description: '',
      sortOrder: 7,
    },
    {
      userId,
      category: 'work',
      role: 'Intern',
      organization: 'Human Resource Development Center — VNU',
      location: 'Hanoi, Vietnam',
      startDate: '09/2023',
      endDate: '01/2024',
      description: '',
      sortOrder: 0,
    },
    {
      userId,
      category: 'work',
      role: 'Intern',
      organization: 'BKAV-AI Corporation',
      location: 'Hanoi, Vietnam',
      startDate: '07/2024',
      endDate: '10/2024',
      description: '',
      sortOrder: 1,
    },
    {
      userId,
      category: 'work',
      role: 'AI Engineer',
      organization: 'VISI AI Vietnam',
      location: 'My Dinh, Hanoi, Vietnam',
      startDate: '05/2025',
      endDate: '08/2025',
      description: '',
      sortOrder: 2,
    },
  ])

  console.log('[v0] Seeding education...')
  await db.insert(education).values([
    {
      userId,
      institution: 'Vietnam National University — International School',
      degree: 'Bachelor of Applied Information Technology',
      location: 'Hanoi, Vietnam',
      startDate: '2022',
      endDate: '2026',
      description: '',
      sortOrder: 0,
    },
  ])

  console.log('[v0] Seeding publications...')
  await db.insert(publications).values([
    {
      userId,
      title: 'T-DDI: Robust Prediction of Drug Interactions using Chemical Descriptors',
      authors:
        'Quang-Hien Kha, Quang-Anh N.D., Khoi-Minh-Uyen Huynh, Dang-Khoa Pham, Van-Hoang-Phi Pham, Tan-Phat Huynh, Hoang-Bach-Dat Le, Nguyen-Phat Vo, Minh Huu Nhat, Ky-Phat Nguyen, Ngoc-Thac Pham, Duc-Toan Nguyen, Thanh-Huy Nguyen, Nguyen Quoc Khanh Le',
      venue: 'npj Digital Medicine (Nature)',
      rank: 'Q1 · IF 18.0',
      year: '',
      link: '',
      sortOrder: 0,
    },
    {
      userId,
      title:
        'Interleaved Selective State Space Models for Efficient WiFi-Based 3D Multi-Person Pose Estimation',
      authors: 'Quang-Anh N. D., Kok-Seng Wong',
      venue: 'International Conference on Machine Learning (ICML 2026)',
      rank: 'Rank A*',
      year: '2026',
      link: '',
      sortOrder: 1,
    },
    {
      userId,
      title:
        'T²-Nav: Algebraic-Topology-Aware Temporal Graph Memory and Loop Detection for Zero-Shot Visual Navigation',
      authors: 'Quang-Anh N. D., Duc Pham Minh, Minh-Anh Nguyen, Duy Tung Doan, Tuan Dang',
      venue: 'IEEE International Conference on Robotics & Automation (ICRA 2026)',
      rank: 'Rank A*',
      year: '2026',
      link: '',
      sortOrder: 2,
    },
    {
      userId,
      title: 'GARFIELD: Graph-Adaptive SSM for Explainable 3D Multi-Person WiFi Pose Estimation',
      authors: 'Quang-Anh N. D., Pham Minh Duc, Kok-Seng Wong',
      venue: 'British Machine Vision Conference',
      rank: 'Rank A',
      year: '',
      link: '',
      sortOrder: 3,
    },
    {
      userId,
      title: 'KOALA: Koopman Operator Learning for WiFi-Based Anticipatory Human Motion Prediction',
      authors:
        'Quang-Anh N. D., Pham Minh Duc, Thao Pham Phuong, Minh-Anh Nguyen, Huan Xuan Nguyen, Tuan Dang',
      venue: 'Transactions on Machine Learning Research',
      rank: '',
      year: '',
      link: '',
      sortOrder: 4,
    },
    {
      userId,
      title:
        'EfficientEndoSeg: A Lightweight YOLOv5-Based Framework for Endoscopic Surgical Instrument Segmentation and Skill Assessment',
      authors:
        'Thai Dinh Kim, Quang-Anh Nguyen-Duc, Minh-Duc Pham, Duy-Tung Doan, Xuan-Hai Le, Ngoc-Thanh Pham',
      venue: 'IEEE Access',
      rank: 'Q1 · IF 3.6',
      year: '',
      link: '',
      sortOrder: 5,
    },
    {
      userId,
      title:
        'Colubrid-Net: A Unified Cross-Modal Framework for Hydrological Forecasting in An Khe Reservoir, Vietnam',
      authors: 'Quang-Anh N.D., Minh-Anh Nguyen, Ngan Thi Tran, Minh Chau Nguyen Thi',
      venue: 'IEEE Geoscience and Remote Sensing Letters',
      rank: 'Q1 · IF 4.7',
      year: '',
      link: '',
      sortOrder: 6,
    },
    {
      userId,
      title:
        'A Multimodal Speech-based Pipeline with Joint Emotion Analysis for Vietnamese Service Quality Assessment',
      authors: 'Quang-Anh N. D., Duc Pham Minh, Thai Kim Dinh, Hai Xuan Le',
      venue: 'International Journal of Speech Technology',
      rank: 'Scopus Q1',
      year: '',
      link: '',
      sortOrder: 7,
    },
    {
      userId,
      title:
        'EmoFedProto: Privacy-Preserving Vietnamese Speech Emotion Recognition via Prototype-Based Federated Learning',
      authors:
        'Quang Anh N.D, Duc Pham Minh, Thao Phuong Pham, Minh-Anh Nguyen, Thai Kim Dinh',
      venue: 'EAI Endorsed Transactions on AI and Robotics',
      rank: 'Scopus Q1',
      year: '',
      link: '',
      sortOrder: 8,
    },
    {
      userId,
      title: 'Heterogeneous Multi-Model Ensemble for PPE Detection in Construction Environments',
      authors:
        'Quang-Anh N. D., Duc Pham Minh, Duy Tung Doan, Minh-Anh Nguyen, Cuong Van Nguyen, Thai Kim Dinh',
      venue: 'EAI Endorsed Transactions on Internet of Things',
      rank: 'Q3',
      year: '',
      link: '',
      sortOrder: 9,
    },
    {
      userId,
      title:
        'A Hybrid Model of SARIMA and GRU in Water Level Forecasting: Case Study in An Khe Reservoir, Vietnam',
      authors:
        'Nguyen Thi Minh Chau, Ngan Tran Thi, Quang-Anh N. D., Minh-Duc Pham, Nguyen Long Giang, Nguyen Nhu Son',
      venue: 'IEICE Transactions on Information and Systems',
      rank: 'Scopus Q3',
      year: '',
      link: '',
      sortOrder: 10,
    },
  ])

  console.log('[v0] Seeding certificates & awards...')
  await db.insert(awards).values([
    { userId, title: 'IELTS 6.0', issuer: '', year: '', description: '', sortOrder: 0 },
    { userId, title: 'Top 8, SoICT Hackathon', issuer: '', year: '2024', description: '', sortOrder: 1 },
    {
      userId,
      title: 'Semi-finalist, National Student Research Award "Eureka"',
      issuer: '',
      year: '2023',
      description: '',
      sortOrder: 2,
    },
    {
      userId,
      title: 'Encouragement Prize, Student Scientific Research (school level, IS-VNU)',
      issuer: 'IS-VNU',
      year: '2023 - 2024',
      description: '',
      sortOrder: 3,
    },
    {
      userId,
      title: 'First, Third, Poster & Video Prizes, Student Scientific Research (school level, IS-VNU)',
      issuer: 'IS-VNU',
      year: '2024 - 2025',
      description: '',
      sortOrder: 4,
    },
    {
      userId,
      title: 'First Prize, Ideathon: Edtech GameAid',
      issuer: 'Hanoi University of Science and Technology',
      year: '2025',
      description: '',
      sortOrder: 5,
    },
    {
      userId,
      title:
        'Certificate of Active Contribution, Tech Talent Hunt & Future Banker Talent Search Competition',
      issuer: 'HDC-VNU',
      year: '2023',
      description: '',
      sortOrder: 6,
    },
    {
      userId,
      title: 'Certificate of Merit, Positive Contributions in Study and Scientific Research',
      issuer: '',
      year: '2022 - 2023',
      description: '',
      sortOrder: 7,
    },
    {
      userId,
      title: 'Certificate of Merit, Excellent Achievements in Youth Month',
      issuer: '',
      year: '2022 - 2023',
      description: '',
      sortOrder: 8,
    },
    { userId, title: 'Blue Star Certificate of Merit', issuer: 'School level', year: '2024 - 2025', description: '', sortOrder: 9 },
    { userId, title: 'Certificate of Good Five Merit', issuer: 'School level', year: '2024 - 2025', description: '', sortOrder: 10 },
    { userId, title: 'Certificate of Good Five Merit', issuer: 'VNU level', year: '2024 - 2025', description: '', sortOrder: 11 },
    {
      userId,
      title: 'Certificate of Merit, Outstanding Achievements in Youth Union Activities',
      issuer: '',
      year: '2024 - 2025',
      description: '',
      sortOrder: 12,
    },
  ])

  console.log('[v0] Seed complete.')
  console.log('[v0] Admin login:', ADMIN_EMAIL, '/', ADMIN_PASSWORD)
  process.exit(0)
}

main().catch((err) => {
  console.error('[v0] Seed failed:', err)
  process.exit(1)
})
