export default function PrivacyPage() {
    return (
        <div className="container mx-auto px-4 py-24 max-w-4xl">
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-8">개인정보처리방침</h1>

            <div className="prose prose-gray max-w-none space-y-8 text-gray-600">
                <section>
                    <h2 className="text-xl font-bold text-black mb-4">1. 개인정보의 처리 목적</h2>
                    <p>
                        변화(Byunhwa)는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며 이용 목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>서비스 제공 및 계약의 이행 (클래스 신청, 상품 주문 등)</li>
                        <li>회원 관리 및 본인 확인</li>
                        <li>고객 문의 응대 및 공지사항 전달</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-black mb-4">2. 개인정보의 처리 및 보유 기간</h2>
                    <p>
                        변화(Byunhwa)는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>계약 또는 청약철회 등에 관한 기록: 5년</li>
                        <li>대금결제 및 재화 등의 공급에 관한 기록: 5년</li>
                        <li>소비자의 불만 또는 분쟁처리에 관한 기록: 3년</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-black mb-4">3. 정보주체의 권리, 의무 및 그 행사방법</h2>
                    <p>
                        이용자는 개인정보주체로서 다음과 같은 권리를 행사할 수 있습니다.
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>개인정보 열람요구</li>
                        <li>오류 등이 있을 경우 정정 요구</li>
                        <li>삭제요구</li>
                        <li>처리정지 요구</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-black mb-4">4. 처리하는 개인정보의 항목</h2>
                    <p>
                        변화(Byunhwa)는 다음의 개인정보 항목을 처리하고 있습니다.
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>필수항목: 성명, 전화번호, 이메일</li>
                        <li>선택항목: 인스타그램 ID</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-black mb-4">5. 개인정보의 파기</h2>
                    <p>
                        변화(Byunhwa)는 원칙적으로 개인정보 처리목적이 달성된 경우에는 지체없이 해당 개인정보를 파기합니다.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-black mb-4">6. 개인정보 보호책임자</h2>
                    <p>
                        변화(Byunhwa)는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
                    </p>
                    <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                        <p><strong>상호명:</strong> 변화(Byunhwa)</p>
                        <p><strong>담당자:</strong> 관리자</p>
                        <p><strong>연락처:</strong> 010-4086-6231</p>
                        <p><strong>이메일:</strong> hoss0225@naver.com</p>
                    </div>
                </section>
            </div>
        </div>
    );
}
