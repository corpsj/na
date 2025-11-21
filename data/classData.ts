export interface ClassDetail {
    id: number;
    title: string;
    subtitle: string;
    category: string;
    level: string;
    date: string;
    time: string;
    location: string;
    price: string;
    priceValue: number; // Numeric value for calculations
    capacity: string;
    image: string;
    description: string;
    curriculum: { step: string; title: string; content: string }[];
    policy: {
        refund: string;
        note: string;
    };
    schedules: string[];
    bankInfo: {
        bank: string;
        account: string;
        holder: string;
    };
}

export const classes: ClassDetail[] = [
    {
        id: 1,
        title: "Winter Wreath Masterclass",
        subtitle: "겨울의 무드를 담은 리스 제작",
        category: "One-day Class",
        level: "Beginner - Intermediate",
        date: "2024. 12. 14 (Sat)",
        time: "14:00 - 16:30 (2.5h)",
        location: "Byunhwa Studio, Hannam-dong",
        price: "150,000 KRW",
        priceValue: 150000,
        capacity: "Max 6 people",
        image: "https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?q=80&w=2000&auto=format&fit=crop",
        description: "겨울의 차가운 공기와 따뜻한 실내의 온기가 만나는 계절, 겨울 소재들을 활용하여 공간에 계절감을 더해줄 리스를 제작합니다. 거친 질감의 소재들과 부드러운 잎들을 조화롭게 엮어내는 방법을 배웁니다.",
        curriculum: [
            {
                step: "01",
                title: "Theory & Demo",
                content: "리스 제작의 기초 이론 설명 및 소재 소개. 플로리스트의 데몬스트레이션."
            },
            {
                step: "02",
                title: "Conditioning",
                content: "소재 컨디셔닝 및 와이어링 기법 실습. 리스 틀 준비."
            },
            {
                step: "03",
                title: "Arrangement",
                content: "그린 소재를 베이스로 형태 잡기. 포인트 소재 배치 및 디자인 밸런스 조정."
            },
            {
                step: "04",
                title: "Finishing & Photo",
                content: "마무리 점검 및 리본 장식. 작품 촬영 및 포장."
            }
        ],
        policy: {
            refund: "수업 7일 전까지 100% 환불 가능하며, 이후에는 재료 준비로 인해 환불 규정이 차등 적용됩니다. 5일 전 70%, 3일 전 50% 환불되며, 수업 2일 전부터는 환불이 불가합니다. 부득이한 사정으로 불참 시, 완성된 작품 또는 꽃 소재를 픽업하실 수 있습니다.",
            note: "시장 상황에 따라 꽃 소재가 변경될 수 있으며, 이는 환불 사유가 되지 않습니다. 수업 시작 10분 전까지 도착해주시기 바라며, 주차 공간이 협소하오니 가급적 대중교통을 이용 부탁드립니다. 수업 중 촬영된 사진은 포트폴리오로 사용될 수 있습니다."
        },
        schedules: [
            "12월 14일 (토) 14:00",
            "12월 15일 (일) 11:00",
            "12월 21일 (토) 14:00"
        ],
        bankInfo: {
            bank: "Shinhan Bank",
            account: "110-123-456789",
            holder: "Byunhwa (Na HoSeong)"
        }
    }
];

export function getClassById(id: number): ClassDetail | undefined {
    return classes.find(c => c.id === id);
}
