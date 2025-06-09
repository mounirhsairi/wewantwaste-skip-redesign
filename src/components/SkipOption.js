import React, { useState } from "react";
import "../App.css";

function SkipOption({ option, index, onSelect }) {
  const [rippleStyle, setRippleStyle] = useState({});

  const handleSelect = (e) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    const newRippleStyle = {
      width: size,
      height: size,
      top: y,
      left: x,
    };
    setRippleStyle(newRippleStyle);
    setTimeout(() => setRippleStyle({}), 600);

    onSelect(option); // Appelle le parent
  };

  const totalPrice = (option.price_before_vat * (1 + option.vat / 100)).toFixed(2);

  return (
    <div className="skip-option-card" style={{ animationDelay: `${0.2 * index}s` }}>
      <img
        src={`https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/${option.size}-yarder-skip.jpg`}
        className="skip-option-image"
        alt={`Skip ${option.size}`}
      />
      <div className="skip-option-info">
         <div className="skip-option-header">
                  <h2 className="skip-option-size">{option.size} Yard Skip</h2>
          <p className="skip-option-price">£{totalPrice}</p>
         </div>
        <p className="skip-option-period">{option.hire_period_days} Days Hire</p>
        
      </div>
      
      <button onClick={handleSelect} className="select-button">
        Select
        <span className="ripple" style={rippleStyle} />
      </button>
    </div>
  );
}

export default SkipOption;
