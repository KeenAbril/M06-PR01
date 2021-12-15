export const labels = [
    '% shots',
    '% passes',
    '% key passes',
    '% duels',
    '% dribbles',
];

export const createData = (data) => ({
    labels,
    datasets: [{
        label: 'Stats',
        data,
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)',
    }],
});