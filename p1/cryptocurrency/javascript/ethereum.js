document.getElementById('convertButton').addEventListener('click', async function () {
    const crypto = document.getElementById('cryptoSelect').value;
    const fiat = document.getElementById('fiatSelect').value;
    const amount = document.getElementById('amountInput').value;

    if (!amount || amount <= 0) {
        alert('Please enter a valid amount.');
        return;
    }

    const apiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=${fiat}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data[crypto] && data[crypto][fiat]) {
            const price = data[crypto][fiat];
            const convertedAmount = (amount * price).toFixed(2);
            document.getElementById('convertedAmount').innerText = `${convertedAmount} ${fiat.toUpperCase()}`;
        } else {
            document.getElementById('convertedAmount').innerText = 'Conversion failed. Try again.';
        }
    } catch (error) {
        console.error('Error fetching conversion data:', error);
        document.getElementById('convertedAmount').innerText = 'Error occurred. Check console.';
    }
});

const apiUrl = "https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=7";

        async function fetchEthereumChartData() {
            try {
                const response = await fetch(apiUrl);
                const data = await response.json();

                // Extract dates and prices
                const labels = data.prices.map(price => {
                    const date = new Date(price[0]);
                    return `${date.getDate()}/${date.getMonth() + 1}`;
                });

                const prices = data.prices.map(price => price[1]);

                // Render the chart
                renderChart(labels, prices);
            } catch (error) {
                console.error("Error fetching Ethereum chart data:", error);
            }
        }

        function renderChart(labels, prices) {
            const ctx = document.getElementById("ethChart").getContext("2d");

            new Chart(ctx, {
                type: "line",
                data: {
                    labels: labels,
                    datasets: [{
                        label: "Ethereum Price (USD)",
                        data: prices,
                        borderColor: "#8e44ad",
                        backgroundColor: "rgba(243, 156, 18, 0.2)",
                        borderWidth: 2,
                        tension: 0.2,
                        pointRadius: 3
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            mode: 'index',
                            intersect: false,
                        }
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: "Date",
                                color: "white",
                                font: { size: 14 }
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: "Price (USD)",
                                color: "white",
                                font: { size: 14 }
                            },
                            ticks: {
                                callback: value => `$${value.toLocaleString()}`
                            }
                        }
                    }
                }
            });
        }

        // Fetch and render Ethereum chart data
        fetchEthereumChartData();