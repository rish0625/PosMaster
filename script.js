function calculatePosture() {
    const postureInput = document.getElementById('postureData').value;
    const resultDiv = document.getElementById('result');
    const adviceDiv = document.getElementById('advice');
    const chartCanvas = document.getElementById('postureChart');

    if (!postureInput) {
        resultDiv.textContent = 'Please enter a posture score.';
        adviceDiv.innerHTML = '';
        clearChart(chartCanvas);
        return;
    }

    const postureScore = Number(postureInput);
    if (isNaN(postureScore) || postureScore < 0 || postureScore > 200) {
        resultDiv.textContent = 'Invalid score. Please enter a number between 0 and 200.';
        adviceDiv.innerHTML = '';
        clearChart(chartCanvas);
        return;
    }

    let postureLevel;
    let imageSrc;
    let adviceText;
    let chartData;

    if (postureScore <= 50) {
        postureLevel = 'Good';
        imageSrc = 'images/good_posture.jpg';
        adviceText = 'Great job! Keep maintaining a good posture. Make sure to stand and sit up straight. From NIH: "Its important that your workstation fits you the best it can. You should also switch sitting positions often, take brief walks around the office, and gently stretch your muscles every so often to help relieve muscle tension.” The foundation of good posture is having a body that can support it.';
        chartData = [1, 1, 1, 1, 1]; // Minimal deterioration over 5 years
    } else if (postureScore <= 100) {
        postureLevel = 'Average';
        imageSrc = 'images/average_posture.jpg';
        adviceText = 'Your posture is average. Try to take breaks, stretch regularly, and avoid slouching. From Medline Plus: "The key to good posture is the position of your spine. Your spine has three natural curves - at your neck, mid back, and low back. Correct posture should maintain these curves, but not increase them. Your head should be above your shoulders, and the top of your shoulder should be over the hips."';
        chartData = [1, 2, 3, 4, 5]; // Moderate deterioration over 5 years
    } else {
        postureLevel = 'Poor';
        imageSrc = 'images/poor_posture.jpg';
        adviceText = 'Your posture needs improvement. Consider doing exercises to strengthen your back and core muscles. From Better Health Channel: "Suggestions to improve your posture include regular exercise and stretching, ergonomic furniture and paying attention to the way your body feels. See your physiotherapist, osteopath, or chiropractor  for further information and advice."';
        chartData = [2, 4, 6, 8, 10]; // Significant deterioration over 5 years
    }

    resultDiv.textContent = `Posture Score: ${postureScore} (${postureLevel})`;
    adviceDiv.innerHTML = `
        <img src="${imageSrc}" alt="${postureLevel} posture">
        <p>${adviceText}</p>
    `;

    renderChart(chartCanvas, chartData);
}

function renderChart(canvas, data) {
    new Chart(canvas, {
        type: 'line',
        data: {
            labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
            datasets: [{
                label: 'Posture Deterioration',
                data: data,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Decline in Health (in %)'
                    }
                }
            }
        }
    });
}

function clearChart(canvas) {
    if (Chart.getChart(canvas)) {
        Chart.getChart(canvas).destroy();
    }
}
