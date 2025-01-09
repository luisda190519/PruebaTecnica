import React from 'react';
import { MessageCircle, Timer, ArrowRight } from 'lucide-react';

const VerificationCode = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="w-full max-w-md mx-auto px-6">
        {/* Header with Icon */}
        <div className="mb-8 text-center mt-16">
          <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center 
                         justify-center bg-gray-100">
            <MessageCircle className="w-8 h-8 text-gray-900" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Ingresa el código
          </h2>
          <p className="text-gray-600">
            Enviado al +57 XXX XXX XXXX
          </p>
        </div>
        
        {/* Code Input */}
        <form className="space-y-8">
          <div className="flex justify-between gap-4">
            {[1,2,3,4].map(i => (
              <input
                key={i}
                type="text"
                maxLength={1}
                className="w-14 h-14 text-center text-2xl font-bold rounded-lg 
                         border-2 border-gray-200"
              />
            ))}
          </div>
          
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <Timer className="w-4 h-4" />
            <span>02:00</span>
          </div>
          
          <button
            type="submit"
            className="w-full h-14 rounded-lg bg-black text-white text-lg 
                     font-medium flex items-center justify-center gap-2">
            <span>Verificar</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          
          <button
            type="button"
            className="w-full py-2 text-center text-gray-900 font-medium">
            Reenviar código
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerificationCode;