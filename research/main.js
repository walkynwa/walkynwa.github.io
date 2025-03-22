document.addEventListener('DOMContentLoaded', function() {
    // Toggle trend cards
    const trendCards = document.querySelectorAll('.trend-card');
    
    trendCards.forEach(card => {
        const header = card.querySelector('.trend-header');
        
        header.addEventListener('click', () => {
            // Close other cards
            trendCards.forEach(otherCard => {
                if (otherCard !== card && otherCard.classList.contains('active')) {
                    otherCard.classList.remove('active');
                }
            });
            
            // Toggle current card
            card.classList.toggle('active');
            
            // Initialize chart when card is expanded
            if (card.classList.contains('active')) {
                const trendId = card.getAttribute('data-trend');
                initChart(trendId);
            }
        });
    });
    
    // Open first trend card by default
    setTimeout(() => {
        if (trendCards.length > 0) {
            trendCards[0].classList.add('active');
            const trendId = trendCards[0].getAttribute('data-trend');
            initChart(trendId);
        }
    }, 500);
    
    // Animate stats counter
    const stats = document.querySelectorAll('.stat-value');
    
    function animateStats() {
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-value'));
            const duration = 2000; // Animation duration in milliseconds
            const step = Math.ceil(target / (duration / 20)); // Increment every 20ms
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    stat.textContent = target;
                    clearInterval(timer);
                } else {
                    stat.textContent = current;
                }
            }, 20);
        });
    }
    
    // Start animation when in view
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.disconnect();
            }
        });
    });
    
    if (stats.length > 0) {
        observer.observe(document.querySelector('.stats-container'));
    }
    
    // Chart initialization
    function initChart(trendId) {
        let chartData;
        const chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.raw + '%';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        };
        
        // Chart data for each trend
        switch(trendId) {
            case 'gen-ai':
                chartData = {
                    labels: ['診断補助', '医療文書作成', '患者情報提供', '臨床試験設計', '医療教育', '研究文献解析'],
                    datasets: [
                        {
                            label: '導入率',
                            data: [68, 76, 42, 29, 58, 81],
                            backgroundColor: 'rgba(61, 108, 223, 0.5)',
                            borderColor: 'rgba(61, 108, 223, 1)',
                            borderWidth: 2
                        },
                        {
                            label: '満足度',
                            data: [72, 83, 65, 59, 79, 88],
                            backgroundColor: 'rgba(62, 198, 224, 0.5)',
                            borderColor: 'rgba(62, 198, 224, 1)',
                            borderWidth: 2
                        }
                    ]
                };
                new Chart(document.getElementById('genAIChart'), {
                    type: 'bar',
                    data: chartData,
                    options: chartOptions
                });
                break;
                
            case 'multimodal':
                chartData = {
                    labels: ['単一モーダルAI', 'マルチモーダルAI'],
                    datasets: [
                        {
                            label: '診断精度',
                            data: [76, 92],
                            backgroundColor: [
                                'rgba(61, 108, 223, 0.5)',
                                'rgba(126, 66, 245, 0.5)'
                            ],
                            borderColor: [
                                'rgba(61, 108, 223, 1)',
                                'rgba(126, 66, 245, 1)'
                            ],
                            borderWidth: 2
                        },
                        {
                            label: '誤診率',
                            data: [18, 6],
                            backgroundColor: [
                                'rgba(239, 71, 111, 0.5)',
                                'rgba(255, 209, 102, 0.5)'
                            ],
                            borderColor: [
                                'rgba(239, 71, 111, 1)',
                                'rgba(255, 209, 102, 1)'
                            ],
                            borderWidth: 2
                        }
                    ]
                };
                new Chart(document.getElementById('multimodalChart'), {
                    type: 'bar',
                    data: chartData,
                    options: chartOptions
                });
                break;
                
            case 'federated':
                chartData = {
                    labels: ['2020', '2021', '2022', '2023', '2024'],
                    datasets: [
                        {
                            label: '参加医療機関数',
                            data: [28, 47, 89, 142, 189],
                            fill: false,
                            borderColor: 'rgba(61, 108, 223, 1)',
                            tension: 0.1,
                            pointBackgroundColor: 'rgba(61, 108, 223, 1)',
                            pointRadius: 5
                        },
                        {
                            label: '開発されたモデル数',
                            data: [5, 12, 24, 43, 67],
                            fill: false,
                            borderColor: 'rgba(126, 66, 245, 1)',
                            tension: 0.1,
                            pointBackgroundColor: 'rgba(126, 66, 245, 1)',
                            pointRadius: 5
                        }
                    ]
                };
                new Chart(document.getElementById('federatedChart'), {
                    type: 'line',
                    data: chartData,
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: 'top',
                            }
                        }
                    }
                });
                break;
                
            case 'edge':
                chartData = {
                    labels: ['クラウドAI', 'エッジAI'],
                    datasets: [
                        {
                            label: 'レイテンシ (ミリ秒)',
                            data: [320, 45],
                            backgroundColor: [
                                'rgba(61, 108, 223, 0.5)',
                                'rgba(62, 198, 224, 0.5)'
                            ],
                            borderColor: [
                                'rgba(61, 108, 223, 1)',
                                'rgba(62, 198, 224, 1)'
                            ],
                            borderWidth: 2
                        },
                        {
                            label: 'オフライン稼働率 (%)',
                            data: [0, 96],
                            backgroundColor: [
                                'rgba(239, 71, 111, 0.5)',
                                'rgba(255, 209, 102, 0.5)'
                            ],
                            borderColor: [
                                'rgba(239, 71, 111, 1)',
                                'rgba(255, 209, 102, 1)'
                            ],
                            borderWidth: 2
                        }
                    ]
                };
                new Chart(document.getElementById('edgeAIChart'), {
                    type: 'bar',
                    data: chartData,
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: 'top',
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
                break;
                
            case 'tinyml':
                chartData = {
                    labels: ['パワー消費 (mW)', 'バッテリー寿命 (日)', '異常検出率 (%)', 'サイズ (cm²)'],
                    datasets: [
                        {
                            label: '従来型医療デバイス',
                            data: [120, 14, 68, 28],
                            backgroundColor: 'rgba(61, 108, 223, 0.2)',
                            borderColor: 'rgba(61, 108, 223, 1)',
                            pointBackgroundColor: 'rgba(61, 108, 223, 1)',
                            pointBorderColor: '#fff',
                            pointHoverBackgroundColor: '#fff',
                            pointHoverBorderColor: 'rgba(61, 108, 223, 1)'
                        },
                        {
                            label: 'TinyML搭載デバイス',
                            data: [20, 180, 92, 5],
                            backgroundColor: 'rgba(126, 66, 245, 0.2)',
                            borderColor: 'rgba(126, 66, 245, 1)',
                            pointBackgroundColor: 'rgba(126, 66, 245, 1)',
                            pointBorderColor: '#fff',
                            pointHoverBackgroundColor: '#fff',
                            pointHoverBorderColor: 'rgba(126, 66, 245, 1)'
                        }
                    ]
                };
                new Chart(document.getElementById('tinyMLChart'), {
                    type: 'radar',
                    data: chartData,
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        elements: {
                            line: {
                                borderWidth: 3
                            }
                        }
                    }
                });
                break;
                
            case 'regulatory':
                chartData = {
                    labels: ['日本', '米国', 'EU', '中国', '英国', 'カナダ', 'オーストラリア'],
                    datasets: [
                        {
                            label: '2023年',
                            data: [32, 45, 38, 53, 41, 36, 33],
                            backgroundColor: 'rgba(61, 108, 223, 0.5)',
                            borderColor: 'rgba(61, 108, 223, 1)',
                        },
                        {
                            label: '2024年',
                            data: [46, 73, 86, 68, 62, 54, 47],
                            backgroundColor: 'rgba(126, 66, 245, 0.5)',
                            borderColor: 'rgba(126, 66, 245, 1)',
                        }
                    ]
                };
                new Chart(document.getElementById('regulatoryChart'), {
                    type: 'polarArea',
                    data: chartData,
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            tooltip: {
                                callbacks: {
                                    label: function(context) {
                                        return context.dataset.label + ': ' + context.raw + '%';
                                    }
                                }
                            }
                        }
                    }
                });
                break;
        }
    }
    
    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get email value
            const email = newsletterForm.querySelector('input[type="email"]').value;
            
            // Simple validation
            if (!email) {
                showNotification('メールアドレスを入力してください。', 'error');
                return;
            }
            
            // For demo purposes, we're just showing a success message
            showNotification('ニュースレターに登録しました。ありがとうございます！', 'success');
            newsletterForm.reset();
        });
    }
    
    // Notification function
    function showNotification(message, type) {
        // Create notification element if it doesn't exist
        let notification = document.querySelector('.notification');
        
        if (!notification) {
            notification = document.createElement('div');
            notification.className = 'notification';
            document.body.appendChild(notification);
        }
        
        // Set message and style based on type
        notification.textContent = message;
        notification.className = `notification ${type}`;
        
        // Add CSS for notification if not already added
        if (!document.getElementById('notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                .notification {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    padding: 15px 25px;
                    border-radius: 6px;
                    font-weight: 500;
                    color: white;
                    z-index: 1000;
                    opacity: 0;
                    transform: translateY(20px);
                    animation: notificationFadeIn 0.3s forwards;
                    max-width: 300px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                }
                
                .notification.success {
                    background-color: #2ecc71;
                }
                
                .notification.error {
                    background-color: #e74c3c;
                }
                
                @keyframes notificationFadeIn {
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes notificationFadeOut {
                    to {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Auto hide after 4 seconds
        setTimeout(() => {
            notification.style.animation = 'notificationFadeOut 0.3s forwards';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 4000);
    }
});