import { updateDataPoint, DataPoint } from './database';

// TODO: Change to use aliases
import { TimeOfDay, Day, Weather } from '../../shared/types/main.types';

const rawData = `
1 midnight Sunday 12 2 cloudy 55.2819977
2 lateAfternoon Tuesday 3 3 stormy 29.6510144
3 evening Tuesday 12 11 stormy 41.9780856
4 midnight Thursday 6 10 sunny 25.6206944
5 earlyAfternoon Tuesday 10 3 cloudy 61.1513711
6 dawn Tuesday 2 2 sunny 8.1594180
7 evening Saturday 5 9 cloudy 0.5184863
8 evening Thursday 11 2 cloudy 62.7894415
9 midnight Saturday 1 14 stormy 19.4273954
10 lateMorning Sunday 9 2 stormy 7.0940917
11 earlyAfternoon Sunday 12 3 rainy 39.6783827
12 midnight Saturday 8 15 stormy 5.0768531
13 earlyAfternoon Sunday 4 6 rainy 88.6617149
14 earlyAfternoon Thursday 5 3 rainy 2.7616772
15 dawn Monday 11 8 rainy 57.8864896
16 evening Saturday 11 0 rainy 43.8474123
17 lateAfternoon Friday 11 7 rainy 67.2026135
18 dawn Friday 11 15 sunny 32.8152667
19 dawn Tuesday 3 6 stormy 15.5041617
20 earlyAfternoon Sunday 10 1 rainy 98.1840888
21 night Friday 9 7 cloudy 83.8933502
22 evening Tuesday 6 0 stormy 86.0404618
23 lateMorning Monday 11 10 stormy 25.0251361
24 dawn Thursday 8 11 rainy 3.8834734
25 lateAfternoon Thursday 6 8 sunny 30.3265515
26 night Thursday 0 8 rainy 53.7082427
27 night Friday 0 1 sunny 32.6651242
28 lateMorning Monday 8 6 cloudy 82.7869004
29 dawn Friday 10 14 stormy 27.1542916
30 lateAfternoon Sunday 8 13 cloudy 96.5251830
31 evening Friday 3 9 sunny 45.7265162
32 earlyMorning Monday 12 2 sunny 84.2023075
33 lateAfternoon Monday 8 6 cloudy 19.4380034
34 lateMorning Sunday 2 11 sunny 41.1353905
35 night Monday 6 15 cloudy 69.9512211
36 evening Monday 5 9 stormy 13.8353092
37 lateAfternoon Thursday 7 15 cloudy 13.2745422
38 earlyMorning Sunday 10 8 stormy 96.9536867
39 earlyMorning Wednesday 8 3 cloudy 71.4595104
40 earlyAfternoon Wednesday 4 11 sunny 4.1067517
41 earlyAfternoon Monday 0 0 cloudy 39.8820901
42 midnight Wednesday 2 1 sunny 43.3520738
43 lateMorning Wednesday 9 0 cloudy 74.4042643
44 dawn Monday 11 15 cloudy 25.0860527
45 lateAfternoon Wednesday 7 13 rainy 18.4333674
46 lateAfternoon Friday 10 11 sunny 8.0872967
47 dawn Tuesday 5 4 rainy 42.8314475
48 midnight Sunday 7 4 sunny 68.8499901
49 night Tuesday 8 15 rainy 5.8193596
50 night Monday 3 10 stormy 91.5213728
51 midnight Thursday 0 6 cloudy 44.2352230
52 night Sunday 0 8 sunny 23.9787359
53 earlyAfternoon Monday 9 8 sunny 9.3873290
54 lateAfternoon Thursday 3 2 cloudy 18.2865997
55 midnight Tuesday 11 2 sunny 93.4613997
56 lateAfternoon Monday 6 15 sunny 63.8270594
57 dawn Sunday 1 15 rainy 51.6696257
58 earlyMorning Sunday 2 2 sunny 65.7111329
59 earlyAfternoon Saturday 0 3 stormy 43.5672899
60 evening Friday 4 7 stormy 73.0039317
61 earlyAfternoon Wednesday 0 5 cloudy 4.7716128
62 midnight Thursday 7 7 sunny 56.6037210
63 evening Saturday 0 0 cloudy 15.8646448
64 earlyMorning Wednesday 10 7 stormy 12.0164648
65 midnight Wednesday 0 3 sunny 34.1879667
66 lateMorning Monday 1 10 sunny 9.1799066
67 lateAfternoon Wednesday 1 0 cloudy 9.4156988
68 earlyMorning Friday 11 7 stormy 31.1413309
69 lateAfternoon Sunday 5 3 sunny 97.9510529
70 night Saturday 6 5 cloudy 17.5330270
71 lateMorning Wednesday 4 7 stormy 1.7161102
72 lateMorning Monday 0 3 cloudy 76.3364423
73 earlyMorning Friday 0 13 rainy 80.6912977
74 lateMorning Tuesday 2 2 sunny 34.6304321
75 evening Sunday 1 15 rainy 46.4673813
76 lateMorning Sunday 4 13 stormy 64.9773683
77 lateAfternoon Saturday 11 8 rainy 4.8058924
78 lateAfternoon Sunday 9 2 rainy 94.9145732
79 midnight Wednesday 5 8 stormy 88.6680387
80 lateAfternoon Monday 6 12 cloudy 26.0893623
81 midnight Sunday 3 1 rainy 1.5304540
82 lateAfternoon Sunday 6 15 cloudy 93.3436308
83 evening Tuesday 10 13 rainy 50.1039884
84 dawn Tuesday 7 1 cloudy 53.9377448
85 midnight Thursday 10 1 stormy 68.3963769
86 earlyAfternoon Friday 0 5 rainy 61.5851164
87 night Wednesday 5 2 stormy 94.3891605
88 earlyMorning Sunday 7 15 rainy 94.4251597
89 lateAfternoon Sunday 4 12 stormy 86.7198934
90 lateMorning Monday 3 8 stormy 63.6403597
91 dawn Thursday 1 3 rainy 80.0949295
92 lateAfternoon Friday 5 0 rainy 67.7168342
93 lateMorning Thursday 5 3 rainy 57.3367042
94 night Saturday 10 0 sunny 12.8500353
95 night Friday 0 13 cloudy 81.1204177
96 night Sunday 8 4 sunny 82.0639476
97 lateMorning Sunday 11 15 sunny 62.5939670
98 lateAfternoon Friday 10 3 stormy 82.0426844
99 night Sunday 5 7 rainy 65.1484772
100 evening Wednesday 12 15 cloudy 20.6684360
`;

//processData: turn data from form of [id, timeOfDay, dayOfWeek, hoursInClasses, hoursFocused, weather, productivity]
//             into the form of DataPoint object, and put in an array
function processRawData(rawData: string): DataPoint[] {
  const dataset = rawData
    .trim()
    .split('\n')
    .map((line) => {
      const parts = line.trim().split(' ');
      const [
        id,
        timeOfDay,
        dayOfWeek,
        hoursInClasses,
        hoursFocused,
        weather,
        productivity,
      ] = parts;
      return {
        timeOfDay: timeOfDay as TimeOfDay,
        dayOfWeek: dayOfWeek as Day,
        hoursInClasses: parseFloat(hoursInClasses),
        hoursFocused: parseFloat(hoursFocused),
        weather: weather as Weather,
        productivity: parseFloat(productivity),
      };
    });
  return dataset;
}

async function main() {
  const allData: DataPoint[] = processRawData(rawData);

  for (let i = 0; i < allData.length; i++) {
    await updateDataPoint(allData[i]);
    console.log('Added data point' + i);
  }
  console.log('iteration completed');
}

main().catch((err) => {
  console.error('Error adding data point', err);
});