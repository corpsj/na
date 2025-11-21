export default function TermsPage() {
    return (
        <div className="container mx-auto px-4 py-24 max-w-4xl">
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-8">이용약관</h1>

            <div className="prose prose-gray max-w-none space-y-8 text-gray-600">
                <section>
                    <h2 className="text-xl font-bold text-black mb-4">제1조 (목적)</h2>
                    <p>
                        이 약관은 변화(Byunhwa)(이하 "회사"라 함)가 운영하는 웹사이트 및 서비스(이하 "서비스"라 함)를 이용함에 있어 회사와 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-black mb-4">제2조 (정의)</h2>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>"서비스"란 회사가 제공하는 모든 서비스를 의미합니다.</li>
                        <li>"이용자"란 서비스에 접속하여 이 약관에 따라 회사가 제공하는 서비스를 받는 회원 및 비회원을 말합니다.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-black mb-4">제3조 (약관의 명시와 개정)</h2>
                    <p>
                        회사는 이 약관의 내용과 상호, 영업소 소재지, 대표자의 성명, 사업자등록번호, 연락처 등을 이용자가 알 수 있도록 서비스의 초기 화면에 게시합니다.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-black mb-4">제4조 (서비스의 제공 및 변경)</h2>
                    <p>
                        회사는 다음과 같은 업무를 수행합니다.
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>재화 또는 용역에 대한 정보 제공 및 구매 계약의 체결</li>
                        <li>구매 계약이 체결된 재화 또는 용역의 배송</li>
                        <li>기타 회사가 정하는 업무</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-black mb-4">제5조 (서비스의 중단)</h2>
                    <p>
                        회사는 컴퓨터 등 정보통신설비의 보수점검, 교체 및 고장, 통신의 두절 등의 사유가 발생한 경우에는 서비스의 제공을 일시적으로 중단할 수 있습니다.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-black mb-4">제6조 (회원가입)</h2>
                    <p>
                        이용자는 회사가 정한 가입 양식에 따라 회원정보를 기입한 후 이 약관에 동의한다는 의사표시를 함으로서 회원가입을 신청합니다.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-black mb-4">제7조 (개인정보보호)</h2>
                    <p>
                        회사는 이용자의 개인정보 수집 시 서비스제공을 위하여 필요한 범위에서 최소한의 개인정보를 수집합니다.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-black mb-4">부칙</h2>
                    <p>
                        이 약관은 2024년 11월 22일부터 시행합니다.
                    </p>
                </section>
            </div>
        </div>
    );
}
