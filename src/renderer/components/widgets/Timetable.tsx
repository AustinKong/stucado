import React from 'react'
import { generateTimetable } from 'Utils/timetableApi'

const Timetable: React.FC = () => {
  return <div>
    <h1>Timetable</h1>
    <button
      onClick={() => generateTimetable('https://nusmods.com/timetable/sem-2/share?CS1010=TUT:02,SEC:1')}
    >
      test
    </button>
  </div>
}

export default Timetable