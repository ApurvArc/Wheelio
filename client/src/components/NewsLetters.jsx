import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useAppContext } from '../context/AppContext';

const NewsLetters = () => {
  const { axios } = useAppContext();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) return;

    try {
      setLoading(true);
      setMessage('');

      const { data } = await axios.post('/api/newsletter/subscribe', {
        email,
      });

      if (data.success) {
        setMessage('✅ Subscribed successfully!');
        setEmail('');
      } else {
        setMessage('❌ Subscription failed');
      }
    } catch (error) {
      setMessage('❌ Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.3 }}
      className="flex flex-col items-center justify-center text-center space-y-2 max-md:px-4 my-10 mb-40"
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="md:text-4xl text-2xl font-semibold dark:text-white"
      >
        Never Miss a Deal!
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="md:text-lg text-gray-500/70 dark:text-gray-400 pb-6"
      >
        Subscribe to get the latest offers, new arrivals, and exclusive discounts
      </motion.p>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="flex items-center justify-between max-w-2xl w-full md:h-13 h-12"
      >
        <input
          className="border border-gray-300 dark:border-gray-600 dark:bg-slate-900 dark:text-white rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500"
          type="email"
          placeholder="Enter your email address"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          disabled={loading}
          type="submit"
          className="md:px-12 px-8 h-full text-white bg-primary hover:bg-primary-dull transition-all cursor-pointer rounded-md rounded-l-none disabled:opacity-60"
        >
          {loading ? '...' : 'Subscribe'}
        </button>
      </motion.form>

      {message && (
        <p className="text-sm mt-2 text-gray-500 dark:text-gray-400">
          {message}
        </p>
      )}
    </motion.div>
  );
};

export default NewsLetters;
