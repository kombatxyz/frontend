'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Navbar from '../navbar';
import { useRouter } from 'next/navigation';
import StepOne from './step-one';
import StepTwo from './step-two';
import FundWalletModal from '../modals/fund-wallet-modal';
import ShareLinkModal from '../modals/share-link-modal';
import InsufficientFundToast from '@/components/modals/toast';
import SuccessToast from '@/components/modals/success-toast';
import P2PBackgroundGrid from '@/assets/images/p2p-background-grid.svg';

const NewKombatForm: React.FC = () => {
  const [showInsufficientFundToast, setShowInsufficientFundToast] =
    useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [isFundWalletModalVisible, setIsFundWalletModalVisible] =
    useState(false);
  const [isShareLinkModalVisible, setIsShareLinkModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    question: '',
    description: '',
    selectedOption: 'yes' as 'yes' | 'no',
    amount: '',
    challenger: '',
    date: '',
    time: '',
  });

  const [step, setStep] = useState(1);

  const [errors, setErrors] = useState({
    question: '',
    description: '',
    amount: '',
    challenger: '',
    date: '',
    time: '',
  });

  const router = useRouter();

  // Mock balance - replace with your actual balance logic if needed
  const balance = 1000;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOptionChange = (option: 'yes' | 'no') => {
    setFormData({ ...formData, selectedOption: option });
  };

  const validateStepOne = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!formData.question.trim()) {
      newErrors.question = 'Question is required';
      isValid = false;
    } else {
      newErrors.question = '';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
      isValid = false;
    } else {
      newErrors.description = '';
    }

    setErrors(newErrors);
    return isValid;
  };

  const validateStepTwo = () => {
    let isValid = true;
    const newErrors = { ...errors };

    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount <= 0) {
      newErrors.amount = 'Amount must be a positive number';
      isValid = false;
    } else if (amount > balance) {
      newErrors.amount = 'Insufficient funds';
      isValid = false;
    } else {
      newErrors.amount = '';
    }

    if (!formData.challenger.trim()) {
      newErrors.challenger = 'Challenger is required';
      isValid = false;
    } else {
      newErrors.challenger = '';
    }

    if (!formData.date.trim()) {
      newErrors.date = 'Date is required';
      isValid = false;
    } else {
      newErrors.date = '';
    }

    if (!formData.time.trim()) {
      newErrors.time = 'Time is required';
      isValid = false;
    } else {
      newErrors.time = '';
    }

    setErrors(newErrors);
    return isValid;
  };

  const nextStep = () => {
    if (step === 1 && validateStepOne()) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const [toastMessage, setToastMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateStepTwo()) {
      const amount = parseFloat(formData.amount);

      if (amount > balance) {
        setToastMessage('Insufficient funds. Please top up your wallet!');
        setShowInsufficientFundToast(true);
        setTimeout(() => setShowInsufficientFundToast(false), 6000);
      } else {
        setToastMessage('Kombat created successfully!');
        setShowSuccessToast(true);
        console.log('formData', formData);
        setTimeout(() => {
          setShowSuccessToast(false);
          router.push('/overview');
        }, 3000);
      }
    }
  };

  const handleCloseFundWalletModal = () => {
    setIsFundWalletModalVisible(false);
  };

  const handleCloseToast = () => {
    setShowInsufficientFundToast(false);
    setShowSuccessToast(false);
  };

  const handleCloseShareLinkModal = () => {
    setIsShareLinkModalVisible(false);
    router.push('/overview');
  };

  return (
    <div className="overview-container">
      <Navbar />
      <div className="wrapper">
        {step === 1 && (
          <StepOne
            formData={formData}
            handleChange={handleChange}
            handleOptionChange={handleOptionChange}
            nextStep={nextStep}
            errors={errors}
          />
        )}
        {step === 2 && (
          <StepTwo
            formData={formData}
            handleChange={handleChange}
            prevStep={prevStep}
            handleSubmit={handleSubmit}
            availableBalance={balance}
            errors={errors}
          />
        )}
      </div>

      {showInsufficientFundToast && (
        <InsufficientFundToast
          message={toastMessage}
          onClose={handleCloseToast}
        />
      )}

      {showSuccessToast && (
        <SuccessToast
          message={'Kombat created successfully!'}
          onClose={handleCloseToast}
        />
      )}

      {isFundWalletModalVisible && (
        <FundWalletModal closeModal={handleCloseFundWalletModal} />
      )}
      {isShareLinkModalVisible && (
        <ShareLinkModal closeModal={handleCloseShareLinkModal} />
      )}

      <Image src={P2PBackgroundGrid} alt="" className="p2p-background-grid" />
    </div>
  );
};

export default NewKombatForm;
