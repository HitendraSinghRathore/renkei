import { useState } from "react";
function ProfileIcon({ userName }) {
    const [randomColor, setRandomColor] = useState(getRandomColor());
  
    function getRandomColor() {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
  
    const firstLetter = userName ? userName.charAt(0).toUpperCase() : '';
  
    const isLightColor = (parseInt(randomColor.slice(1, 7), 16) > 0xffffff / 2);
    const textColor = isLightColor ? '#000' : '#fff'; 
  
    return (
        <div className="w-10 h-10 rounded-full border border-primary flex items-center justify-center" style={{ backgroundColor: randomColor }}>
          <span className="text-base font-bold" style={{ color: textColor }}>{firstLetter}</span>
        </div>
    );
  }
  
  export default ProfileIcon;