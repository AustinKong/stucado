import React from 'react'
import { generateTimetable } from 'Utils/timetableApi'

const Timetable: React.FC = () => {
  return <div>
    <h1>Timetable</h1>
    <button
      onClick={() => generateTimetable('https://nusmods.com/timetable/sem-2/share?CS1010=TUT:02,SEC:1&CS1010E=SEC:2,TUT:18&CS1010R=&CS1010S=TUT:12,REC:03,LEC:1&CS2030=LAB:10A,REC:02,LEC:1&CS2030S=LAB:16E,REC:03,LEC:2')}
    >
      test
    </button>
  </div>
}

export default Timetable