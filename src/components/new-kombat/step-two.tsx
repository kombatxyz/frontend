'use client';
import React, { useState, useEffect } from 'react';
import backIcon from '@/assets/images/icons/back-icon.svg';
import buttonBg from '@/assets/images/icons/button-bg.svg';
import errorIcon from '@/assets/images/icons/error.svg';
import Image from 'next/image';

interface StepTwoProps {
  formData: {
    question: string;
    description: string;
    selectedOption: 'yes' | 'no';
    amount: string;
    challenger: string;
    date: string;
    time: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  prevStep: () => void;
  handleSubmit: (e: React.FormEvent) => void;
  errors: {
    amount: string;
    challenger: string;
    date: string;
    time: string;
  };
  availableBalance: number;
}

const StepTwo: React.FC<StepTwoProps> = ({
  formData,
  handleChange,
  prevStep,
  handleSubmit,
  errors,
  availableBalance,
}) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [unixTime, setUnixTime] = useState<number>(86400);
  const [dateTimeError, setDateTimeError] = useState<string>('');

  useEffect(() => {
    validateDateTime();
  }, [date, time]);

  const validateDateTime = () => {
    if (date && time) {
      const selectedDateTime = new Date(`${date}T${time}:00`);
      const currentDateTime = new Date();

      if (selectedDateTime <= currentDateTime) {
        setDateTimeError('Selected time must be in the future');
        setUnixTime(0);
      } else {
        setDateTimeError('');
        const unix = Math.floor(selectedDateTime.getTime() / 1000);
        setUnixTime(unix);
      }
    } else {
      setDateTimeError('');
      setUnixTime(0);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dateTimeError && unixTime > 0) {
      handleSubmit(e);
    }
  };

  return (
    <div className="start-new-kombat-content start-new-kombat-step-two">
      <button className="back-btn" type="button" onClick={prevStep}>
        <Image src={backIcon} alt="arrow-left" />
        Back
      </button>
      <form id="step-two-form" onSubmit={handleFormSubmit}>
        <div className="form-group">
          <div className="amount">
            <label>
              Kombat Amount
              {errors.amount && (
                <span className="error-icon">
                  <Image src={errorIcon} alt="" />
                </span>
              )}
            </label>
            <div className="available-balance">${availableBalance} USDC</div>
          </div>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter amount"
          />
        </div>

        <div className="form-group">
          <label>
            Who are you challenging?
            {errors.challenger && (
              <span className="error-icon">
                <Image src={errorIcon} alt="" />
              </span>
            )}
          </label>
          <input
            type="text"
            name="challenger"
            value={formData.challenger}
            onChange={handleChange}
            placeholder="Enter challenger wallet address"
          />
        </div>

        <div className="form-group">
          <label htmlFor="">Time Bet Would End</label>
          {dateTimeError && (
            <span className="error-message">{dateTimeError}</span>
          )}
          <div className="duration">
            <input
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
              min={new Date().toISOString().split('T')[0]}
              placeholder="Select date"
            />
            <input
              type="time"
              value={time}
              onChange={(e) => {
                setTime(e.target.value);
              }}
              placeholder="Select time"
            />
          </div>
        </div>

        <button
          id="submit-btn"
          type="submit"
          disabled={!!dateTimeError || unixTime === 0}
        >
          <Image src={buttonBg} alt="" />
          <div>Submit</div>
        </button>
      </form>
    </div>
  );
};

export default StepTwo;
