// 카카오 SDK 초기화
Kakao.init('cec305e1f78338a41f1e4fcf5673a4b4'); // 발급받은 JavaScript 키로 초기화

// 카카오톡 공유하기 버튼 클릭 이벤트
document.getElementById('kakao-share-btn').addEventListener('click', function() {
    Kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
            title: '나경이의 돌잔치 초대장♡',
            description: '나경이의 첫 생일 파티, 여기서 만나요! 🧸',
            imageUrl: 'https://ifh.cc/g/q6dSRK.jpg', // 공유할 이미지 URL
            link: {
                mobileWebUrl: 'https://appropriate-alligator-nagyeong-7fc063a7.koyeb.app',
                webUrl: 'https://appropriate-alligator-nagyeong-7fc063a7.koyeb.app'
            }
        },
        buttons: [
            {
                title: '웹으로 보기',
                link: {
                    mobileWebUrl: 'https://appropriate-alligator-nagyeong-7fc063a7.koyeb.app',
                    webUrl: 'https://appropriate-alligator-nagyeong-7fc063a7.koyeb.app'
                }
            }
        ]
    });
});