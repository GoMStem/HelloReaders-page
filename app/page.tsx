'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, BookOpen, Brain, PenLine, Mail, Phone, MapPin, ChevronDown } from 'lucide-react';

function renderBold(text: string): React.ReactNode {
  const parts = text.split(/\*\*([\s\S]*?)\*\*/);
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part || null
  );
}

const colors = {
  primary: '#C2A040',
  primaryDark: '#A68830',
  secondary: '#1a1a1a',
  background: '#ffffff',
  text: '#1a1a1a',
  textGray: '#666666',
  cardBg: '#ffffff',
};

const programImages: Record<'reading' | 'debating' | 'maths', string> = {
  reading: '/reading.jpg',
  debating: '/debating.jpg',
  maths: '/maths.jpg',
};

export default function Page() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get('lang');
    if (urlLang === 'en') setLanguage('en');
    else if (urlLang === 'ko') setLanguage('ko');
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const [expandedFaq, setExpandedFaq] = useState<Set<number>>(new Set());
  const [selectedFaqTab, setSelectedFaqTab] = useState<'reading' | 'debating' | 'maths' | 'other'>('reading');
  const [selectedCurriculum, setSelectedCurriculum] = useState<'reading' | 'debating' | 'maths'>('reading');
  const [selectedWhy, setSelectedWhy] = useState<'reading' | 'debating' | 'maths'>('reading');
  const [language, setLanguage] = useState<'ko' | 'en'>('ko');

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
    );
    document.querySelectorAll('.reveal:not(.visible), .reveal-left:not(.visible), .reveal-right:not(.visible), .reveal-scale:not(.visible), .reveal-fade:not(.visible), .reveal-gentle:not(.visible), .about-card:not(.visible)').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [selectedCurriculum, selectedWhy]);

  const whyData = {
    ko: {
      reading: {
        title: "Why Hello Readers **Reading Program**",
        items: [
          {
            title: "Paper Books & Audiobooks",
            description: "종이책은 집중력과 이해력을 높이고,\n오디오북은 자연스러운 영어의 흐름과 표현을 익히도록 돕습니다.\n\n리딩 레벨은\n읽기와 듣기가 함께할 때 성장합니다."
          },
          {
            title: "Flexible Schedule",
            description: "월-금 중 원하는 요일 선택 가능하며\n방과후 오후 4:30분 이전까지 자유롭게 입장하여 시작 가능합니다."
          },
          {
            title: "Personalised Learning",
            description: "학생 개개인의 리딩 레벨과 이해도에 맞춰 진행됩니다."
          },
          {
            title: "Deep Understanding",
            description: "질문과 디스커션을 통해 깊이있는 이해를 이끌어냅니다."
          },
          {
            title: "Weekly Updates",
            description: "**매주 학생들의 학습 내용을 공유하며,\n학생의 성장 과정을 확인할 수 있습니다.**"
          },
        ]
      },
      debating: {
        title: "Why Hello Readers\n**Debating & Essay Writing Program**",
        items: [
          {
            title: "Weekly Topics",
            description: "매주 새로운 토픽으로 다양한 주제를 다룹니다."
          },
          {
            title: "Structured Writing Goals",
            description: "명확한 목표를 통해 단계적으로 Writing Skill를 성장시킵니다."
          },
          {
            title: "Weekly Feedback Updates",
            description: "학생의 성장 과정을 꾸준히 확인할 수 있습니다."
          },
          {
            title: "Small Group Discussion",
            description: "소규모 수업으로 진행되며, 모든 학생이 충분히 자신의 생각을 표현할 수 있습니다."
          },
        ]
      },
      maths: {
        title: "Why Hello Readers **Brain Maths**",
        items: [
          {
            title: "Spiral Learning System",
            description: "**스파이럴 방식으로 개념을 반복하며 학습합니다.**"
          },
          {
            title: "Free Maths Clinic Class",
            description: "주기적으로 진행되는 무료 클리닉 수업을 통해 복습, 오답확인, 심화문제 풀이가 추가됩니다."
          },
          {
            title: "Progress Check",
            description: "정기적인 테스트를 통해\n학생들의 이해도와 학습 진행 상황을 확인합니다."
          },
        ]
      },
    },
    en: {
      reading: {
        title: "Why Hello Readers **Reading Program**",
        items: [
          {
            title: "Paper Books & **Audiobooks**",
            description: "Paper books help students build focus and deeper comprehension,\nwhile audiobooks develop **a** natural understanding of English flow and expression.\nReading levels grow best when reading and listening work together."
          },
          {
            title: "Flexible Schedule",
            description: "Students can choose their preferred days from Monday to Friday\nand freely join after school before 4:30 PM."
          },
          {
            title: "Personalised Learning",
            description: "Classes are tailored to each student's reading level, comprehension, and learning pace."
          },
          {
            title: "Deep Understanding",
            description: "Teachers fully understand the books used in class\nand guide students beyond surface-level comprehension through meaningful discussion and questioning."
          },
          {
            title: "Weekly Updates",
            description: "Parents receive weekly updates on reading, discussions, and writing activities\nto clearly track each student's progress and growth."
          },
        ]
      },
      debating: {
        title: "Why Hello Readers\n**Debating & Essay Writing Program**",
        items: [
          {
            title: "Weekly Topics",
            description: "Students explore a new topic every week\nthroughout the year with no repetition."
          },
          {
            title: "Structured Writing Goals",
            description: "Writing skills are developed step by step\nthrough five structured seasons, each with clear learning goals."
          },
          {
            title: "Weekly Feedback Updates",
            description: "Weekly essay writing feedback is shared with parents through Notion,\nallowing consistent tracking of student progress."
          },
          {
            title: "Small Group Discussion",
            description: "Classes are limited to a maximum of 4 students,\ngiving every student enough time to share and express their ideas confidently."
          },
        ]
      },
      maths: {
        title: "Why Hello Readers **Brain Maths**",
        items: [
          {
            title: "Spiral Learning System",
            description: "Students learn through a spiral learning approach\nthat continuously revise key concepts."
          },
          {
            title: "Additional Skill Practice",
            description: "Additional arithmetic and foundational practice are provided alongside the main curriculum."
          },
          {
            title: "Progress Check",
            description: "Regular assessments help monitor each student's understanding, progress, and overall development."
          },
        ]
      },
    },
  };

  const curriculumData = {
    ko: {
      reading: [
        { title: "Reading", description: "종이책과 오디오북을 통해\n깊이 읽고 이해하는 힘을 기릅니다." },
        { title: "Retelling & Discussion", description: "리텔링과 북 디스커션을 통해\n읽은 내용을 자신의 언어로 표현합니다." },
        { title: "Writing & Expression", description: "책의 내용과 주제에 따라\n다양한 방식의 writing을 진행합니다." },
        { title: "Growth", description: "다양한 문장 구조와 표현을 배우며\n이해력과 표현력을 함께 성장시킵니다." },
      ],
      debating: [
        { title: "Read Current Issues", description: "다양한 사회적 이슈와 저널을 읽고\n주제에 대한 이해를 넓힙니다." },
        { title: "Discuss Different Perspectives", description: "다양한 관점으로 토론하고 사고를 확장합니다." },
        { title: "Build Logical Arguments", description: "논리적으로 정리하고 근거를 바탕으로 생각을 발전시킵니다." },
        { title: "Structured Essay Writing", description: "Structured Writing으로 연결하며\n논리적인 글쓰기 능력을 기릅니다." },
      ],
      maths: [
        { title: "Foundation Building", description: "학년별 개념과 커리큘럼을 탄탄하게 완성합니다." },
        { title: "Analysis & Reasoning", description: "분석하며 논리적으로 사고하는 힘을 기릅니다." },
        { title: "Problem Solving", description: "Reasoning과 Problem Solving에 집중합니다." },
        { title: "Advanced Thinking Maths", description: "토픽별 사고력 수학과 심화 문장제 문제를 진행합니다." },
      ],
    },
    en: {
      reading: [
        { title: "Reading", description: "Students build deep comprehension and meaningful understanding through paper books and audiobooks." },
        { title: "Retelling & Discussion", description: "Through retelling and book discussions, students learn to express their understanding in their own words." },
        { title: "Writing & Expression", description: "Students explore a variety of writing styles based on each book and topic." },
        { title: "Growth", description: "Students develop stronger comprehension, sentence structures, and natural expression skills." },
      ],
      debating: [
        { title: "Read Current Issues", description: "Students read journals and articles on a wide range of social issues and current topics each week." },
        { title: "Discuss Different Perspectives", description: "Students expand their thinking through discussions from different perspectives." },
        { title: "Build Logical Arguments", description: "Students learn to organize and support their ideas with clear reasoning and logical thinking." },
        { title: "Structured Essay Writing", description: "Students turn discussions into structured writing and develop logical essay writing skills." },
      ],
      maths: [
        { title: "Foundation Building", description: "Students build strong foundations by completing their year-level curriculum during the first half of the year." },
        { title: "Analysis & Reasoning", description: "Students develop logical thinking by reading, analyzing, and understanding mathematical problems." },
        { title: "Problem Solving", description: "Students focus on reasoning and problem-solving rather than repetitive calculations." },
        { title: "Advanced Thinking Maths", description: "In the second half of the year, students work on topic-based critical thinking maths and advanced word problems." },
      ],
    },
  };

  const content = {
    ko: {
      nav: {
        home: "홈",
        about: "소개",
        curriculum: "프로그램",
        faq: "FAQ",
        contact: "연락처"
      },
      hero: {
        subtitle: "Read deeply · Think logically · Grow intelligently",
        title1: "학생 한 명 한 명의",
        title2: "성장",
        title2suffix: "을 응원합니다",
        description: "리딩은 이해력을,\n수학은 논리력을 키웁니다.\n\n이 두 힘을 연결해\n생각하는 아이로 성장시킵니다.",
        cta1: "상담 신청하기",
        cta2: "프로그램 살펴보기"
      },
      about: {
        title: "About Hello Readers",
        subtitle: "모든 학습의 중심은 읽고 이해하고 생각하는 힘입니다.",
        features: [
          {
            title: "읽고 이해하는 힘",
            description: "종이책과 오디오북을 기반으로\n깊이 있게 읽고 의미를 이해하는 힘을 키웁니다."
          },
          {
            title: "논리적으로 사고하는 힘",
            description: "읽고 분석하고 생각하는 과정을 통해\n논리적 사고력과 문제 해결력을 함께 키웁니다."
          },
          {
            title: "생각을 표현하는 힘",
            description: "**Retelling, Discussion, Writing을 통해\n자신의 생각을 말하고 글로 표현합니다.**"
          }
        ]
      },
      curriculum: {
        title: "프로그램 안내",
        subtitle: "깊이 읽고, 사고하며, 자신있게 표현하는 힘을 키우는 프로그램",
        tabs: {
          reading: "Reading Program",
          debating: "Debating & Essay Writing Program",
          maths: "Brain Maths"
        },
        yearRanges: {
          reading: { main: "Year 1-8", levels: [] },
          debating: { main: "Year 4 – 8", levels: ["Level 1 — Year 4 & 5", "Level 2 — Year 5 & 6", "Level 3 — Year 7 & 8"] },
          maths: { main: "Year 3-7", levels: [] }
        }
      },
      faq: {
        title: "자주 묻는 질문",
        subtitle: "궁금하신 사항을 확인해보세요",
        tabs: { reading: "Reading Program", debating: "Debating & Essay Writing Program", maths: "Maths Program", other: "General Questions" },
        items: {
          reading: [
            {
              question: "매주 읽는 책은 어떻게 선정되나요?",
              answer: "학생들은 기본적으로 학년별 평균 리딩 레벨을 기준으로 수업을 시작하며, 이후에는 개별 학생의 읽기 수준, 이해도, 관심사에 맞추어 책이 선정됩니다.\n\n학생들의 리딩 편식을 줄이기 위해 픽션과 넌픽션을 균형 있게 배치하며, 특정 레벨의 책만 반복적으로 읽지 않도록 구성합니다. 주차에 따라 조금 더 도전적인 책을 읽기도 하고, 때로는 쉽고 흥미롭게 읽을 수 있는 책을 선택하기도 합니다.\n\n이를 통해 학생들이 독서에 대한 흥미를 지속적으로 유지하고, 다양한 장르와 난이도의 책을 자연스럽게 경험할 수 있도록 지도합니다."
            },
            {
              question: "형제자매가 같은 시간에 수업할 수 있나요?",
              answer: "학년별로 수업이 진행되지 않고, 학생 개개인의 리딩 레벨과 이해도에 맞춰 수업이 이루어지기 때문에 형제자매가 같은 시간대에 함께 수업할 수 있습니다."
            },
            {
              question: "수업 시간과 입장 시간은 어떻게 되나요?",
              answer: "Reading Program은 방과 후 3:15–4:30 사이 자유 입장 방식으로 운영됩니다.\n학생들은 입장한 시점부터 각자의 수업 시간만큼 수업이 진행됩니다.\n\n수업시간\nYear 1–2: 1 hour 20 minutes\nYear 3–8: 2 hours\n\n단, Year 3 학생들의 경우에는 집중 시간, 책의 길이, 라이팅 분량 등 개별 상황에 따라 수업 시간이 조정될 수 있습니다."
            },
            {
              question: "결석 시 보충 수업이 가능한가요?",
              answer: "개인 사정(가족 행사, 컨디션 난조 등)으로 결석하는 경우, 당일 오후 12시 이전까지 알려주시면 다른 요일의 보충 수업으로 대체 가능합니다.\n\n보충 수업은 한 텀당 1회로 제한되며, 그 외 결석에 대해서는 환불 및 이월이 엄격하게 불가능합니다.\n\n보충 수업은 기존 등록 요일 외에 추가로 수업을 진행하는 방식이며, 동일한 텀 내에서만 사용 가능합니다.\n\n사전 연락 없는 무단 결석이 2회 이상 발생할 경우, 자동으로 등록 취소될 수 있습니다."
            },
          ],
          maths: [
            {
              question: "어떤 방식으로 수업하며, 어떤 교재를 사용하나요?",
              answer: "수업은 Oxford 교재와 Singapore Maths 교재를 기반으로 진행됩니다.\n\nOxford 교재를 통해서는 매주 Numbers, Geometry, Statistics의 세 가지 영역을 spiral 방식으로 학습합니다. 개념을 먼저 설명한 뒤, 다양한 문제 풀이를 통해 이해를 확장하는 방식으로 수업이 진행됩니다. 또한 Singapore Maths를 활용하여 사고력 중심의 심화 수학을 학습합니다."
            },
            {
              question: "영어로 수학을 배우는 것과 한국어로 뉴질랜드 수학을 배우는 것은 어떤 차이가 있나요?",
              answer: "한국 수학과 영어권 수학은 단순히 언어만 다른 것이 아니라, 개념을 설명하고 접근하는 방식 자체에 차이가 있습니다.\n\n한국어로 설명하면 학생이 더 쉽게 이해할 것이라고 생각하시는 경우가 많지만, 실제로 뉴질랜드 학교 수학에서 어려움을 느끼는 원인은 수학 자체보다 영어 이해와 수학적 표현 방식인 경우가 많습니다. 따라서 영어로 수학을 배우고 사고하는 경험이 매우 중요합니다."
            },
            {
              question: "결석 시 보충 수업이 가능한가요?",
              answer: "수학 수업은 그룹 수업으로 정해진 진도에 맞춰 진행되기 때문에 별도의 보충 수업은 제공되지 않으며, 환불 및 크레딧 이월 또한 불가능합니다.\n\n결석으로 인해 빠진 부분은 가정 내 학습으로 보완해주셔야 하며, 이후 주기적으로 진행되는 무료 클리닉 수업을 통해 부족한 부분을 추가적으로 보강할 수 있습니다."
            },
          ],
          debating: [
            {
              question: "어느 정도의 영어 레벨이면 수업에 참여할 수 있나요?",
              answer: "수업은 영어로 진행되며, 학생들은 자신이 속해있는 레벨에 맞는 텍스트를 비교적 편하게 읽을 수 있어야 합니다. 또한 자신의 생각을 말과 글로 자연스럽게 표현할 수 있는 수준이 필요합니다.\n\n본 프로그램은 영어 자체를 처음 배우는 수업이 아니라, 이미 영어로 기본적인 읽기와 의사소통이 자유로운 학생들을 대상으로 사고력, 토론, 그리고 라이팅 능력을 확장하는 데에 초점을 두고 있습니다."
            },
            {
              question: "수업 대상과 시간은 어떻게 되나요?",
              answer: "Debating & Essay Writing Program은 학생들의 학년과 영어 활용 능력을 기준으로 아래와 같이 구성됩니다.\n\nLevel 1 : Year 4–5\nLevel 2 : Year 5–6\nLevel 3 : Year 7–8\n\n모든 수업은 1시간 20분 동안 진행됩니다."
            },
            {
              question: "결석 시 보충 수업이 가능한가요?",
              answer: "토론 수업은 소그룹으로 운영되며, 결석 시 환불 및 크레딧 이월은 불가능 합니다. (개인 사정 및 학교 일정(캠프 포함) 등 모든 결석을 포함)\n\n보충 수업은 한 텀당 1회로 제한되며, 동일한 주차 내 다른 시간대의 수업으로 제공 됩니다.\n\n매주 모든 레벨이 하나의 공통 토픽으로 진행되는 만큼 반드시 결석한 주차 안에서 본인의 레벨에 맞춰 진행되어야 합니다.\n\n동일 주차 내 토론 수업으로 보충이 어려운 경우에는 Reading Program으로 대체 보충이 이루어지며, 리딩 수업 보충은 동일한 텀 내에서 자유롭게 사용할 수 있습니다."
            },
          ],
          other: [
            {
              question: "결제는 어떻게 이루어지나요?",
              answer: "매월 1일, 해당 월의 수업 횟수에 따라 이메일로 인보이스가 발행됩니다.\n\n결제는 계좌이체 또는 현금으로 가능하며, 원활한 운영과 관리 효율을 위해 별도의 EFTPOS 결제는 제공되지 않습니다."
            },
            {
              question: "트라이얼 수업이 가능한가요?",
              answer: "네, 가능합니다. 트라이얼 수업은 정규 수업과 동일한 수업료가 적용됩니다."
            },
            {
              question: "공휴일 및 방학 중에도 수업이 진행되나요?",
              answer: "모든 프로그램은 공휴일에는 쉬어갑니다.\n\n방학 기간에는 리딩수업만 운영되며, Debating & Essay Writing 과 Maths Program은 진행되지 않습니다.\n\n방학 리딩 수업은 학기 중 운영 방식과 동일하게 진행되며, 오전 9:30–10:00 사이 자유 입장으로 시작됩니다.\n\n또한 방학 프로그램은 원하는 요일과 횟수를 자유롭게 선택하여 등록할 수 있으며, 방학 기간에만 단독으로 참여하는 것도 가능합니다."
            },
          ]
        }
      },
      contact: {
        title: "상담 및 문의",
        subtitle: "언제든지 편하게 연락주세요.",
        phone: "전화 문의",
        email: "이메일",
        location: "오시는 길",
        hours: "운영시간: 평일 13:00 – 20:00",
        consultLabel: '상담 신청',
        consultTitle: '궁금하신 점이 있으신가요?',
        consultDesc: '아래 버튼을 통해 간편하게 상담을 신청해 주세요.',
        consultBtn: '상담 신청하기',
      },
      footer: {
        copyright: "© 2026 Hello Readers. All rights reserved."
      }
    },
    en: {
      nav: {
        home: "Home",
        about: "About",
        curriculum: "Program",
        faq: "FAQ",
        contact: "Contact"
      },
      hero: {
        subtitle: "Read deeply · Think logically · Grow intelligently",
        title1: "Supporting Every Student's",
        title2: "Growth",
        title2suffix: "",
        description: "Reading builds understanding.\nMaths builds reasoning.\nTogether, they build thinkers.",
        cta1: "Make An Inquiry",
        cta2: "Explore the Program"
      },
      about: {
        title: "About Hello Readers",
        subtitle: "The foundation of all learning is the ability to read, understand, and think.",
        features: [
          {
            title: "Understanding Through Reading",
            description: "Through paper books and audiobooks,\nstudents build deep comprehension\nand meaningful understanding."
          },
          {
            title: "Logical & Critical Thinking",
            description: "Through Reading and Brain Maths,\nstudents develop reasoning\nand problem-solving skills."
          },
          {
            title: "Expression & Communication",
            description: "Through retelling, discussion, and writing,\nstudents learn to express their thoughts\nclearly and confidently."
          }
        ]
      },
      curriculum: {
        title: "OUR PROGRAMS",
        subtitle: "Programs designed to help students read deeply, think critically, and express confidently.",
        tabs: {
          reading: "Reading Program",
          debating: "Debating & Essay Writing Program",
          maths: "Brain Maths"
        },
        yearRanges: {
          reading: { main: "Year 1-8", levels: [] },
          debating: { main: "Year 4 – 8", levels: ["Level 1 — Year 4 & 5", "Level 2 — Year 5 & 6", "Level 3 — Year 7 & 8"] },
          maths: { main: "Year 3-7", levels: [] }
        }
      },
      faq: {
        title: "Frequently Asked Questions",
        subtitle: "",
        tabs: { reading: "Reading Program", debating: "Debating & Essay Writing Program", maths: "Maths Program", other: "General Inquiries" },
        items: {
          reading: [
            {
              question: "How are books selected each week?",
              answer: "Students initially begin with books suited to the average reading level of their school year, but selections are soon personalised based on each student's reading ability, comprehension, and interests.\n\nFiction and non-fiction books are carefully balanced to ensure students experience a wide variety of genres, topics, and difficulty levels while maintaining long-term interest in reading."
            },
            {
              question: "Can siblings attend classes at the same time?",
              answer: "Yes. Since classes are not strictly divided by school year level, students are taught according to their individual reading level and comprehension. This allows siblings to attend classes during the same time slot while still receiving personalised learning suited to their own abilities."
            },
            {
              question: "What are the class hours and arrival times?",
              answer: "The Reading Program operates with flexible arrival between 3:15 PM and 4:30 PM after school. Each student's class begins from the time they arrive and runs for the duration of their scheduled lesson.\n\nClass Duration\nYear 1–2: 1 hour 20 minutes\nYear 3–8: 2 hours\n\nYear 3 class duration may be adjusted depending on the student's concentration span and workload."
            },
            {
              question: "Are make-up classes available for absences?",
              answer: "If a student is unable to attend due to personal circumstances, parents must notify us before 12:00 PM on the day of the class.\n\nWhere availability permits, one make-up class per term may be offered on an alternative day.\n\nPlease note that missed classes are otherwise non-refundable and non-transferable.\n\nMake-up classes must be used within the same term and are offered in addition to the student's regular scheduled class.\n\nRepeated absences without prior notice may result in cancellation of enrolment."
            },
          ],
          debating: [
            {
              question: "What are the class levels and lesson duration?",
              answer: "The Debating & Essay Writing Program is organised based on students' school year and English proficiency.\n\nLevel 1: Year 4–5\nLevel 2: Year 5–6\nLevel 3: Year 7–8\n\nAll classes run for 1 hour and 20 minutes."
            },
            {
              question: "Are make-up classes available for absences?",
              answer: "Refunds, credits, or transfers are not available for missed classes, including absences due to personal circumstances or school events such as camps.\n\nWhere availability permits, one make-up class per term may be offered.\n\nMake-up classes must be attended within the same week as the missed lesson, as all levels discuss a common weekly topic. Students are therefore required to attend a class appropriate to their level during that same week.\n\nIf a debating make-up class is not available within the same week, a Reading Program class may be offered instead. Reading make-up classes may be used flexibly within the same term."
            },
          ],
          maths: [
            {
              question: "How are classes structured, and which textbooks are used?",
              answer: "Lessons are based on both Oxford and Singapore Maths materials."
            },
            {
              question: "Are make-up classes available for absences?",
              answer: "As maths classes follow a structured group curriculum, separate make-up classes are not provided. Refunds, credits, or transfers are also not available for missed classes.\n\nStudents are expected to catch up on missed work through home study.\n\nAdditional support may also be available through our clinic sessions, which are offered periodically throughout the term."
            },
          ],
          other: [
            {
              question: "How does payment work?",
              answer: "Invoices are issued by email on the 1st of each month based on the number of classes scheduled for that month.\n\nPayment is made via bank transfer. Please note that EFTPOS payments are not available."
            },
            {
              question: "Are trial lessons available?",
              answer: "Yes, trial lessons are available.\n\nPlease note that trial lessons are charged at the regular class rate."
            },
            {
              question: "Are classes held during public holidays and school holidays?",
              answer: "All programs are closed on public holidays.\n\nDuring the school holidays, only the Reading Program operates. Debating & Essay Writing and Maths classes are not held during the holiday period.\n\nHoliday Reading classes run in the same format as during the school term, with flexible arrival available between 9:30 AM and 10:00 AM.\n\nFamilies may choose their preferred days and number of sessions during the holiday program, and students are also welcome to attend only during the school holidays."
            },
          ]
        }
      },
      contact: {
        title: "Contact Us",
        subtitle: "",
        phone: "Phone",
        email: "Email",
        location: "Location",
        hours: "Hours: Weekdays 13:00 – 20:00",
        consultLabel: 'INQUIRY',
        consultTitle: 'Need more information?',
        consultDesc: '',
        consultBtn: 'Submit the form',
      },
      footer: {
        copyright: "© 2026 Hello Readers. All rights reserved."
      }
    }
  };

  const curriculum = curriculumData[language];
  const faqs = content[language].faq.items[selectedFaqTab];
  const featureIcons = [
    <BookOpen key="book" className="w-8 h-8" />,
    <Brain key="brain" className="w-8 h-8" />,
    <PenLine key="pen" className="w-8 h-8" />,
  ];
  const features = content[language].about.features.map((feature, index) => ({
    icon: featureIcons[index],
    title: feature.title,
    description: feature.description,
  }));

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>

      {/* Drawer Overlay */}
      <div
        onClick={() => setDrawerOpen(false)}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 60,
          backgroundColor: 'rgba(10, 8, 4, 0.18)',
          backdropFilter: 'blur(1.5px)',
          WebkitBackdropFilter: 'blur(1.5px)',
          opacity: drawerOpen ? 1 : 0,
          pointerEvents: drawerOpen ? 'auto' : 'none',
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Drawer */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          height: '100%',
          width: '280px',
          zIndex: 70,
          background: 'linear-gradient(160deg, rgba(255,255,255,0.91) 0%, rgba(251,248,240,0.87) 100%)',
          backdropFilter: 'blur(10px) saturate(160%)',
          WebkitBackdropFilter: 'blur(10px) saturate(160%)',
          borderLeft: '1px solid rgba(212, 175, 55, 0.18)',
          boxShadow: '-1px 0 0 rgba(255,255,255,0.7), -16px 0 48px rgba(0,0,0,0.07), -4px 0 12px rgba(212,175,55,0.06)',
          transform: drawerOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
          display: 'flex',
          flexDirection: 'column',
          padding: '24px',
        }}
      >
        {/* Drawer Header */}
        <div className="flex justify-between items-center mb-8">
          <img src="/logo.png" alt="Hello Readers" style={{ height: '32px', width: 'auto' }} />
          <button
            onClick={() => setDrawerOpen(false)}
            className="p-2 rounded-lg transition-colors"
            style={{ color: colors.textGray }}
            onMouseEnter={e => (e.currentTarget.style.color = colors.text)}
            onMouseLeave={e => (e.currentTarget.style.color = colors.textGray)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', backgroundColor: '#e0e0e0', marginBottom: '24px' }} />

        {/* Drawer Links */}
        <nav className="flex flex-col gap-2">
          <Link
            href={`/blog?lang=${language}`}
            onClick={() => setDrawerOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all"
            style={{ color: colors.text }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = `${colors.primary}12`;
              e.currentTarget.style.color = colors.primary;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = colors.text;
            }}
          >
            Blog
          </Link>
        </nav>
      </div>

      {/* Scroll Progress Bar */}
      <div style={{
        position: 'fixed',
        top: '64px',
        left: 0,
        right: 0,
        height: '2px',
        backgroundColor: 'rgba(0,0,0,0.06)',
        zIndex: 49,
      }}>
        <div style={{
          height: '100%',
          width: `${scrollProgress}%`,
          background: 'linear-gradient(90deg, #A68830 0%, #C2A040 45%, #D8B858 75%, #ECCE78 100%)',
          boxShadow: '0 0 8px rgba(212,175,55,0.5)',
          transition: 'width 0.08s linear',
        }} />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50" style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 2px 15px rgba(0,0,0,0.1)'
      }}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-6">
              <div className="flex items-center">
                <img src="/logo.png" alt="Hello Readers" style={{ height: '36px', width: 'auto' }} />
              </div>

              {/* Language Switcher */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { setLanguage('ko'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-sm font-semibold transition-colors"
                  style={{ color: language === 'ko' ? colors.primary : colors.textGray }}
                >
                  KO
                </button>
                <span style={{ color: colors.textGray }}>|</span>
                <button
                  onClick={() => { setLanguage('en'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-sm font-semibold transition-colors"
                  style={{ color: language === 'en' ? colors.primary : colors.textGray }}
                >
                  EN
                </button>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {(['home', 'about', 'curriculum', 'faq', 'contact'] as const).map((key) => (
                <a
                  key={key}
                  href={`#${key === 'curriculum' ? 'programs' : key}`}
                  className="transition-colors"
                  style={{ color: colors.text }}
                  onMouseEnter={e => (e.currentTarget.style.color = colors.primary)}
                  onMouseLeave={e => (e.currentTarget.style.color = colors.text)}
                >
                  {content[language].nav[key]}
                </a>
              ))}
              <button
                onClick={() => setDrawerOpen(true)}
                className="p-2 rounded-lg transition-colors"
                style={{ color: colors.text }}
                onMouseEnter={e => (e.currentTarget.style.color = colors.primary)}
                onMouseLeave={e => (e.currentTarget.style.color = colors.text)}
                aria-label="메뉴 열기"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ color: colors.text }}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t" style={{ borderColor: '#e0e0e0' }}>
              {(['home', 'about', 'curriculum', 'faq', 'contact'] as const).map((key) => (
                <a
                  key={key}
                  href={`#${key === 'curriculum' ? 'programs' : key}`}
                  className="block py-2 transition-colors"
                  style={{ color: colors.text }}
                  onMouseEnter={e => (e.currentTarget.style.color = colors.primary)}
                  onMouseLeave={e => (e.currentTarget.style.color = colors.text)}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {content[language].nav[key]}
                </a>
              ))}
              <Link
                href={`/blog?lang=${language}`}
                className="block py-2 transition-colors"
                style={{ color: colors.text }}
                onMouseEnter={e => (e.currentTarget.style.color = colors.primary)}
                onMouseLeave={e => (e.currentTarget.style.color = colors.text)}
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 min-h-[85vh] flex items-center" style={{
        background: 'linear-gradient(160deg, #1a1712 0%, #161310 60%, #1e1b14 100%)'
      }}>
        <div className="max-w-4xl mx-auto text-center w-full">
          <div className="mb-6">
            <span className="text-xs tracking-widest whitespace-pre-line sm:whitespace-normal" style={{ color: '#888888', letterSpacing: '3px' }}>
              Reading - Debating & Essay Writing -{'\n'}Brain Maths
            </span>
          </div>

          <h1 className="text-[3.375rem] sm:text-[4.125rem] lg:text-[5rem] font-bold mb-8 hero-title hero-logo-v1" style={{
            background: 'linear-gradient(160deg, #B09228 0%, #C2A040 30%, #D8B858 55%, #C2A040 75%, #A68830 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 4px 18px rgba(212,175,55,0.45)) drop-shadow(0 1px 4px rgba(180,140,20,0.3))',
          }}>
            Hello Readers
          </h1>

          <div className="mb-6">
            <p className="text-xs sm:text-sm tracking-wide uppercase mb-2" style={{
              color: '#888888',
              letterSpacing: '2px'
            }}>
              <span className="hidden sm:inline">{content[language].hero.subtitle}</span>
              <span className="sm:hidden">Read deeply · Think logically ·<br />Grow intelligently</span>
            </p>
          </div>

          {language === 'ko' ? (
            <div className="mb-12 max-w-lg mx-auto text-center hero-text-block">
              <p className="text-xl sm:text-3xl font-semibold" style={{ color: '#f0f0f0', letterSpacing: '-0.01em' }}>
                리딩은 <span style={{ color: colors.primary, textShadow: '0 2px 10px rgba(212,175,55,0.45)' }}>이해력</span>을,
              </p>
              <p className="text-xl sm:text-3xl font-semibold" style={{ color: '#f0f0f0', letterSpacing: '-0.01em' }}>
                수학은 <span style={{ color: colors.primary, textShadow: '0 2px 10px rgba(212,175,55,0.45)' }}>논리력</span>을 키웁니다.
              </p>
              <div style={{
                margin: '1.6rem auto',
                height: '1px',
                width: '60px',
                background: `linear-gradient(to right, transparent, ${colors.primary}, transparent)`
              }} />
              <p className="text-lg sm:text-2xl" style={{ color: '#aaaaaa', fontWeight: 400 }}>
                이 두 힘을 연결해
              </p>
              <p className="text-lg sm:text-2xl font-semibold" style={{ color: '#f0f0f0' }}>
                <span style={{ color: colors.primary, textShadow: '0 2px 10px rgba(212,175,55,0.45)' }}>생각하는 아이</span>로 성장시킵니다.
              </p>
            </div>
          ) : (
            <div className="mb-12 max-w-lg mx-auto text-center hero-text-block">
              <p className="text-xl sm:text-3xl font-semibold" style={{ color: '#f0f0f0', letterSpacing: '-0.01em' }}>
                Reading builds <span style={{ color: colors.primary, textShadow: '0 2px 10px rgba(212,175,55,0.45)' }}>understanding.</span>
              </p>
              <p className="text-xl sm:text-3xl font-semibold" style={{ color: '#f0f0f0', letterSpacing: '-0.01em' }}>
                Maths builds <span style={{ color: colors.primary, textShadow: '0 2px 10px rgba(212,175,55,0.45)' }}>reasoning.</span>
              </p>
              <div style={{
                margin: '1.6rem auto',
                height: '1px',
                width: '60px',
                background: `linear-gradient(to right, transparent, ${colors.primary}, transparent)`
              }} />
              <p className="text-xl sm:text-3xl font-bold" style={{ color: '#f0f0f0', letterSpacing: '-0.02em' }}>
                Together, they build{' '}
                <span style={{ color: colors.primary, textShadow: '0 2px 10px rgba(212,175,55,0.45)' }}>thinkers.</span>
              </p>
            </div>
          )}

          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="#contact"
              className="px-10 py-4 rounded-lg transition-all text-lg font-semibold cta-primary-btn"
              style={{
                backgroundColor: colors.primary,
                color: '#ffffff',
                boxShadow: '0 4px 15px rgba(212, 175, 55, 0.4)',
                border: `2px solid ${colors.primary}`,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = '#A68830';
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = colors.primary;
                e.currentTarget.style.color = '#ffffff';
              }}
            >
              {content[language].hero.cta1}
            </a>
            <a
              href="#programs"
              className="px-10 py-4 rounded-lg transition-all text-lg font-semibold"
              style={{
                border: `2px solid ${colors.primary}`,
                color: colors.primary,
                backgroundColor: 'transparent',
                boxShadow: '0 4px 15px rgba(212,175,55,0.3)'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = colors.primary;
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = colors.primary;
              }}
            >
              {content[language].hero.cta2}
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-16 reveal">
            <h2 className="text-2xl sm:text-4xl font-bold mb-3 sm:mb-4" style={{ color: colors.text }}>
              {content[language].about.title}
            </h2>
            <p className="text-base sm:text-lg max-w-2xl mx-auto" style={{ color: colors.textGray }}>
              {language === 'ko' ? (
                <>
                  모든 학습의 중심은<br className="sm:hidden" /> 읽고 이해하고 생각하는 힘입니다.
                </>
              ) : content[language].about.subtitle}
            </p>
            <div style={{ width: '48px', height: '1px', background: `linear-gradient(to right, transparent, ${colors.primary}, transparent)`, margin: '1.25rem auto 0' }} />
          </div>

          <div className="grid md:grid-cols-3 gap-5 sm:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`about-card p-5 sm:p-8 rounded-xl reveal-d${index + 1}`}
                style={{
                  backgroundColor: '#ffffff',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  border: '1px solid #e0e0e0'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
                  e.currentTarget.style.borderColor = colors.primary;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                  e.currentTarget.style.borderColor = '#e0e0e0';
                }}
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center mb-4 sm:mb-6" style={{
                  backgroundColor: `${colors.primary}20`,
                  color: colors.primary
                }}>
                  {feature.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3" style={{ color: colors.text }}>
                  {feature.title}
                </h3>
                <p className="whitespace-pre-line text-sm sm:text-base" style={{ color: colors.textGray, lineHeight: '1.8' }}>
                  {renderBold(feature.description)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section id="programs" className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: colors.text }}>
              {content[language].curriculum.title}
            </h2>
            <p className="text-lg" style={{ color: colors.textGray }}>
              {content[language].curriculum.subtitle}
            </p>
            <div style={{ width: '48px', height: '1px', background: `linear-gradient(to right, transparent, ${colors.primary}, transparent)`, margin: '1.5rem auto 0' }} />
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12 reveal reveal-d1">
            {(['reading', 'debating', 'maths'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedCurriculum(tab)}
                className="px-5 sm:px-8 py-2.5 sm:py-3 rounded-lg transition-all font-semibold text-sm sm:text-base"
                style={{
                  backgroundColor: selectedCurriculum === tab ? colors.primary : 'transparent',
                  color: selectedCurriculum === tab ? '#ffffff' : colors.textGray,
                  border: `2px solid ${selectedCurriculum === tab ? colors.primary : '#e0e0e0'}`,
                  boxShadow: selectedCurriculum === tab ? '0 4px 15px rgba(212, 175, 55, 0.3)' : 'none'
                }}
              >
                {content[language].curriculum.tabs[tab]}
              </button>
            ))}
          </div>

          {/* Program Image + Year Range overlay */}
          <div className="max-w-2xl mx-auto w-full mb-8 rounded-xl overflow-hidden" style={{ position: 'relative', height: '260px' }}>
            {/* Image */}
            <img
              src={programImages[selectedCurriculum]}
              alt={selectedCurriculum}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            {/* Dark overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.48)',
            }} />
            {/* Year text on top */}
            {content[language].curriculum.yearRanges[selectedCurriculum].main && (
              <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1.5rem',
                textAlign: 'center',
              }}>
                <p style={{ color: colors.primary, fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.14em', marginBottom: '0.6rem' }}>
                  {content[language].curriculum.yearRanges[selectedCurriculum].main}
                </p>
                {content[language].curriculum.yearRanges[selectedCurriculum].levels.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    {content[language].curriculum.yearRanges[selectedCurriculum].levels.map((level, i) => (
                      <span key={i} style={{ color: 'rgba(255,255,255,0.82)', fontSize: '0.75rem' }}>
                        {level}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Cards Grid — v2: horizontal oval */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto w-full">
            {curriculum[selectedCurriculum].map((card, index) => (
              <div
                key={index}
                className={`program-card reveal reveal-d${index + 1} flex items-center gap-5`}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e8e8e8',
                  boxShadow: '0 4px 18px rgba(0,0,0,0.07)',
                  borderRadius: '999px',
                  padding: '1.1rem 1.8rem',
                  transition: 'border-color 0.3s ease, box-shadow 0.3s ease, opacity 0.65s cubic-bezier(0.4,0,0.2,1), transform 0.65s cubic-bezier(0.4,0,0.2,1)',
                }}
              >
                {/* Number */}
                <span style={{ color: colors.primary, fontSize: '0.75rem', fontWeight: 700, flexShrink: 0, minWidth: '24px' }}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                {/* Divider */}
                <div style={{ width: '1px', height: '32px', backgroundColor: `${colors.primary}40`, flexShrink: 0 }} />
                {/* Text */}
                <div>
                  <p className="text-sm font-bold" style={{ color: colors.text }}>{card.title}</p>
                  <p className="text-xs whitespace-pre-line" style={{ color: colors.textGray, lineHeight: '1.7', marginTop: '2px' }}>{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Hello Readers Section */}
      <section id="why" className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-5xl mx-auto">

          {/* Title */}
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: colors.text }}>
              Why Hello Readers?
            </h2>
            <div style={{ width: '60px', height: '1px', background: `linear-gradient(to right, transparent, ${colors.primary}, transparent)`, margin: '0 auto' }} />
          </div>

          {/* Two-column layout */}
          <div className="flex flex-col md:flex-row gap-0 reveal-right reveal-d1">

            {/* Left: Vertical Tabs */}
            <div className="md:w-60 flex-shrink-0 flex md:flex-col gap-0 border-b md:border-b-0 md:border-r mb-8 md:mb-0"
              style={{ borderColor: '#e8e8e8' }}>
              {(['reading', 'debating', 'maths'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedWhy(tab)}
                  className="text-left px-5 py-4 text-sm font-semibold transition-all"
                  style={{
                    borderLeft: selectedWhy === tab ? `3px solid ${colors.primary}` : '3px solid transparent',
                    backgroundColor: selectedWhy === tab ? `${colors.primary}08` : 'transparent',
                    color: selectedWhy === tab ? colors.text : colors.textGray,
                  }}
                >
                  {tab === 'reading' && 'Reading Program'}
                  {tab === 'debating' && 'Debating & Essay Writing'}
                  {tab === 'maths' && 'Brain Maths'}
                </button>
              ))}
            </div>

            {/* Right: Content Panel */}
            <div className="flex-1 md:pl-12">
              {(() => {
                const panel = whyData[language][selectedWhy];
                return (
                  <div>
                    <h3 className="text-xl font-bold mb-10 whitespace-pre-line sm:whitespace-normal" style={{ color: colors.text }}>
                      {renderBold(panel.title)}
                    </h3>
                    {panel.items.length === 0 ? (
                      <p style={{ color: colors.textGray }}>준비 중입니다.</p>
                    ) : (
                      <div>
                        {panel.items.map((item, i) => (
                          <div key={i}>
                            {i > 0 && (
                              <div style={{ height: '1px', backgroundColor: '#eeeeee', margin: '1.75rem 0' }} />
                            )}
                            <h4 className="font-bold text-sm mb-2" style={{ color: colors.primary }}>
                              {renderBold(item.title)}
                            </h4>
                            <p className="whitespace-normal sm:whitespace-pre-line text-sm"
                              style={{ color: colors.textGray, lineHeight: '1.85' }}>
                              {renderBold(item.description)}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: colors.text }}>
              {content[language].faq.title}
            </h2>
            {content[language].faq.subtitle && (
              <p className="text-lg" style={{ color: colors.textGray }}>
                {content[language].faq.subtitle}
              </p>
            )}
            <div style={{ width: '48px', height: '1px', background: `linear-gradient(to right, transparent, ${colors.primary}, transparent)`, margin: '1.5rem auto 0' }} />
          </div>

          {/* FAQ Tabs */}
          <div className="flex flex-wrap justify-center mb-10" style={{ borderBottom: '1px solid #e8e8e8' }}>
            {(['reading', 'debating', 'maths', 'other'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => { setSelectedFaqTab(tab); setExpandedFaq(new Set()); }}
                className="px-5 py-3 text-sm font-semibold transition-all relative"
                style={{
                  color: selectedFaqTab === tab ? colors.primary : colors.textGray,
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderBottom: selectedFaqTab === tab
                    ? `2px solid ${colors.primary}`
                    : '2px solid transparent',
                  marginBottom: '-1px',
                }}
              >
                {content[language].faq.tabs[tab]}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-lg overflow-hidden reveal"
                style={{
                  backgroundColor: '#ffffff',
                  boxShadow: expandedFaq.has(index)
                    ? '0 6px 24px rgba(212,175,55,0.14)'
                    : '0 4px 15px rgba(0,0,0,0.08)',
                  border: `1px solid ${expandedFaq.has(index) ? colors.primary + '55' : '#e0e0e0'}`,
                  transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                }}
              >
                <button
                  onClick={() => {
                    setExpandedFaq(prev => {
                      const next = new Set(prev);
                      next.has(index) ? next.delete(index) : next.add(index);
                      return next;
                    });
                  }}
                  className="w-full px-6 py-5 text-left flex justify-between items-center"
                  style={{
                    color: expandedFaq.has(index) ? colors.primary : colors.text,
                    backgroundColor: expandedFaq.has(index) ? `${colors.primary}08` : 'transparent',
                    transition: 'background-color 0.3s ease, color 0.3s ease',
                  }}
                  onMouseEnter={e => {
                    if (!expandedFaq.has(index)) e.currentTarget.style.backgroundColor = '#f8f8f8';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.backgroundColor = expandedFaq.has(index) ? `${colors.primary}08` : 'transparent';
                  }}
                >
                  <span className="font-semibold pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${expandedFaq.has(index) ? 'rotate-180' : ''}`}
                    style={{ color: colors.primary }}
                  />
                </button>
                {expandedFaq.has(index) && (
                  <div
                    className="faq-answer px-6 py-4 whitespace-pre-line"
                    style={{
                      color: colors.textGray,
                      borderTop: `1px solid ${colors.primary}22`,
                      borderLeft: `3px solid ${colors.primary}`,
                      backgroundColor: `${colors.primary}05`,
                      lineHeight: '1.85',
                    }}
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8" style={{
        backgroundColor: '#ffffff'
      }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 reveal">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: colors.text }}>
              {content[language].contact.title}
            </h2>
            {content[language].contact.subtitle && (
              <p className="text-lg" style={{ color: colors.textGray }}>
                {content[language].contact.subtitle}
              </p>
            )}
            <div style={{ width: '48px', height: '1px', background: `linear-gradient(to right, transparent, ${colors.primary}, transparent)`, margin: '1.5rem auto 0' }} />
          </div>

          {/* Consultation CTA Banner */}
          <div className="mb-10 max-w-2xl mx-auto">
            <div
              className="rounded-xl flex flex-col sm:flex-row items-center justify-between gap-5 px-7 py-6"
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e8e8e8',
                borderLeft: `4px solid ${colors.primary}`,
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              }}
            >
              <div className="text-center sm:text-left">
                <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: colors.primary, letterSpacing: '0.12em' }}>
                  {content[language].contact.consultLabel}
                </p>
                <p className="font-bold text-base" style={{ color: colors.text }}>
                  {content[language].contact.consultTitle}
                </p>
                {content[language].contact.consultDesc && (
                  <p className="text-sm mt-1" style={{ color: colors.textGray }}>
                    {content[language].contact.consultDesc}
                  </p>
                )}
              </div>
              <a
                href="#"
                className="w-full sm:w-auto px-7 py-3 rounded-lg font-semibold transition-all text-sm text-center"
                style={{
                  backgroundColor: '#1a1a1a',
                  color: '#ffffff',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
                  border: '2px solid #1a1a1a',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = '#333333';
                  e.currentTarget.style.boxShadow = '0 4px 14px rgba(0,0,0,0.3)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = '#1a1a1a';
                  e.currentTarget.style.boxShadow = '0 4px 14px rgba(0,0,0,0.2)';
                }}
              >
                {content[language].contact.consultBtn}
              </a>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: <Phone className="w-8 h-8 mx-auto mb-4" style={{ color: colors.primary }} />, label: content[language].contact.phone, value: '021-235-1778' },
              { icon: <Mail className="w-8 h-8 mx-auto mb-4" style={{ color: colors.primary }} />, label: content[language].contact.email, value: 'helloreaders.nz@gmail.com' },
              {
                icon: <MapPin className="w-8 h-8 mx-auto mb-4" style={{ color: colors.primary }} />,
                label: content[language].contact.location,
                value: '31E Apollo Drive, Rosedale\nAuckland, New Zealand'
              },
            ].map((item, index) => (
              <div key={index} className={`text-center p-6 rounded-lg reveal-fade reveal-d${index + 1}`} style={{
                backgroundColor: '#ffffff',
                boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                border: '1px solid #e0e0e0'
              }}>
                {item.icon}
                <h3 className="font-semibold mb-2" style={{ color: colors.text }}>{item.label}</h3>
                <p className="whitespace-pre-line" style={{ color: colors.textGray }}>{item.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm" style={{ color: colors.textGray }}>
              {content[language].contact.hours}
            </p>
          </div>

          {language === 'ko' && (
            <div className="mt-10 text-center">
              <p className="text-xs tracking-widest mb-5" style={{ color: colors.textGray, letterSpacing: '0.1em' }}>
                SNS
              </p>
              <div className="flex justify-center gap-4">
                {/* Instagram */}
                <a
                  href="https://instagram.com/helloreaders_31e"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all"
                  style={{ border: `1px solid ${colors.primary}50`, color: colors.text, backgroundColor: '#fff' }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = colors.primary;
                    e.currentTarget.style.boxShadow = `0 4px 14px rgba(212,175,55,0.2)`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = `${colors.primary}50`;
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                  Instagram
                </a>
                {/* Threads */}
                <a
                  href="https://threads.net/@helloreaders_31e"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all"
                  style={{ border: `1px solid ${colors.primary}50`, color: colors.text, backgroundColor: '#fff' }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = colors.primary;
                    e.currentTarget.style.boxShadow = `0 4px 14px rgba(212,175,55,0.2)`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = `${colors.primary}50`;
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.5 12.068c0-3.7.944-6.673 2.806-8.838C6.08 1.097 8.837.007 12.39.007c3.225 0 5.746.836 7.484 2.487.978.932 1.718 2.098 2.186 3.441l-2.51.79c-.36-1.009-.902-1.862-1.608-2.526-1.36-1.296-3.358-1.952-5.94-1.952-2.764 0-4.916.812-6.397 2.414-1.398 1.509-2.106 3.735-2.106 6.617 0 3.006.718 5.306 2.134 6.836 1.457 1.577 3.609 2.375 6.398 2.393h.007c2.562 0 4.464-.674 5.657-2.003.842-.938 1.35-2.226 1.513-3.836-.883.193-1.82.299-2.808.33-.45.007-2.043 0-3.87-.413-5.3-1.195-1.638-.9-2.59-2.25-2.67-3.796-.044-.856.123-1.67.497-2.417.424-.844 1.091-1.53 1.978-2.037.98-.56 2.176-.856 3.47-.856 1.63 0 3.07.444 4.15 1.284.26.202.5.42.716.654l.886-.374c.847-.344 1.726-.643 2.626-.89-.413-.876-.941-1.665-1.576-2.35-1.636-1.787-3.9-2.69-6.726-2.69z"/>
                  </svg>
                  Threads
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 sm:px-6 lg:px-8" style={{
        backgroundColor: '#ffffff',
        borderTop: '1px solid rgba(212,175,55,0.2)'
      }}>
        <div className="max-w-7xl mx-auto text-center">
          <span className="brand-text text-xl font-medium" style={{ color: colors.primary, letterSpacing: '0.1em' }}>
            Hello Readers
          </span>
          <div style={{ width: '32px', height: '1px', background: `linear-gradient(to right, transparent, ${colors.primary}, transparent)`, margin: '0.6rem auto 0.8rem' }} />
          <p className="text-xs" style={{ color: '#aaaaaa', letterSpacing: '0.05em' }}>
            {content[language].footer.copyright}
          </p>
        </div>
      </footer>
    </div>
  );
}
