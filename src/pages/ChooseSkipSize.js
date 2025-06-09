import React, { useState, useEffect } from "react";
import SkipOption from "../components/SkipOption";
import Modal from "../components/Modal";
import "../App.css";

function ChooseSkipSize() {
  const [skipOptions, setSkipOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    async function fetchSkipOptions() {
      try {
        const response = await fetch(
          "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch skip options.");
        }
        const data = await response.json();
        setSkipOptions(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchSkipOptions();
  }, []);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setShowModal(true);
  };

  const totalPrice = selectedOption
    ? (selectedOption.price_before_vat * (1 + selectedOption.vat / 100)).toFixed(2)
    : null;

  return (
    <div className="choose-skip-container">
      <header className="header">
        <h1>Choose Your Skip Size</h1>
        <p>Select the skip that suits your needs for garden waste collection.</p>
      </header>
      <main>
        {loading ? (
          <p className="loading-text">Loading skip options...</p>
        ) : error ? (
          <p className="error-text">Error: {error}</p>
        ) : (
          <div className="skip-options-grid">
            {skipOptions.map((option, index) => (
              <SkipOption
                key={option.id}
                option={option}
                index={index}
                onSelect={handleSelect}
              />
            ))}
          </div>
        )}
      </main>

      {selectedOption && (
        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          title="Skip Selected"
        >
          <p>
            You selected a <strong>{selectedOption.size} yard skip</strong> for{" "}
            <strong>{selectedOption.hire_period_days} days</strong> at{" "}
            <strong>£{totalPrice}</strong>.
          </p>
        </Modal>
      )}
    </div>
  );
}

export default ChooseSkipSize;
