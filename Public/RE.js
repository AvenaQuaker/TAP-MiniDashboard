
//Generacion de las Graficas mediante los datos (data)
config1 = {
    hideHover: 'always',
    resize:true,
    element: 'line-chart',
    data: [
        { month: '2024-01', value: 20 },
        { month: '2024-02', value: 10 },
        { month: '2024-03', value: 5 },
        { month: '2024-04', value: 5 },
        { month: '2024-05', value: 20 },
        { month: '2024-06', value: 20 },
        { month: '2024-07', value: 10 },
        { month: '2024-08', value: 5 },
        { month: '2024-09', value: 5 },
        { month: '2024-10', value: 20 },
        { month: '2024-11', value: 20 },
        { month: '2024-12', value: 20 }
    ],
    xkey: 'month',
    ykeys: ['value'],
    labels: ['Ganancias Totales'],
    lineColors: ['darkGreen'],
    pointFillColors: ['lightGreen']
}; Morris.Line(config1);

config2 = {
    hideHover: 'always',
    resize:true,
    element: 'area-chart',
    data: [
        { month: '2024-01', a: 5, b:7, c:12 },
        { month: '2024-02', a: 10, b:9,c:11},
        { month: '2024-03', a: 5 ,b:8,c:6 },
        { month: '2024-04', a: 11 ,b:9,c:7 },
        { month: '2024-05', a: 9,b:10 ,c:11 },
        { month: '2024-06', a: 7,b:6 ,c:12 },
        { month: '2024-07', a: 13,b:7 ,c:5 },
        { month: '2024-08', a: 6, b:8 ,c:16},
        { month: '2024-09', a: 6 ,b:9,c:7 },
        { month: '2024-10', a: 11, b:10 ,c:9},
        { month: '2024-11', a: 10,b:7,c:11  },
        { month: '2024-12', a: 7 ,b:15,c:6 }
    ],
    xkey: 'month',
    ykeys: ['a','b','c'],
    labels: ['Lunes-Jueves','Viernes','Fin de Semana'],
    lineColors: ['#035a7c','#002488','#3b0088'],
    ymax: 40,
}; Morris.Area(config2);

config3 = {
    hideHover: 'always',
    resize:true,
    element: 'bar-chart',
    data: [
        { y: 'Enero', a: 15000, b: 20000, c: 10000},
        { y: 'Febrero', a: 22000, b: 18000, c: 25000},
        { y: 'Marzo', a: 28000, b: 16000, c: 21000},
        { y: 'Abril', a: 12000, b: 27000, c: 19000},
        { y: 'Mayo', a: 25000, b: 14000, c: 23000},
        { y: 'Junio', a: 17000, b: 24000, c: 20000},
        { y: 'Julio', a: 19000, b: 22000, c: 27000},
        { y: 'Agosto', a: 23000, b: 19000, c: 18000},
        { y: 'Septiembre', a: 20000, b: 25000, c: 17000},
        { y: 'Octubre', a: 16000, b: 21000, c: 24000},
        { y: 'Noviembre', a: 21000, b: 17000, c: 22000},
        { y: 'Diciembre', a: 18000, b: 23000, c: 16000}
    ],
    xkey: 'y',
    ykeys: ['a','b','c'],
    labels: ['Servicios','Mantenimiento','Productos'],
    pointFillColors:['#ffffff'],
    pointStrokeColors: ['black'],
    barColors:['darkred','#b90000','#ff3700'],
    stacked: true,
}; Morris.Bar(config3);

config4 = {
    resize:true,
    element: 'donut-chart',
    data: [
    {label: "PayPal", value: 15},
    {label: "Mastercard", value: 45},
    {label: "Visa", value: 25},
    {label: "Oxxo", value: 10},
    {label: "GooglePlay", value: 5},
    ],
    formatter: function (y, data) { return y + '%' },
}; Morris.Donut(config4);