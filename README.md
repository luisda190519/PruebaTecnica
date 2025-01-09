# Diseño de Arquitectura Técnica

## Descripción
EL programa en general es un sistema de autenticación mediante número telefónico implementado con Next.js y TypeScript, utilizando Zustand para el manejo de estado global.

## Estructura del Proyecto
```
src/
├── app/
│   └── components/
│       └── auth/           
│           ├── AuthFlow.tsx
│           ├── LoginLanding.tsx
│           ├── PhoneInput.tsx
│           ├── VerificationCode.tsx
│           └── LoadingScreen.tsx
├── hooks/
│   └── auth/              
├── store/
│   └── auth/              
├── tests/                 
└── types/                 
```

## Tecnologías Utilizadas
- Next.js
- TypeScript
- Zustand (manejo de estado)
- Vitest (testing)
- Tailwind CSS (estilos)
- React Testing Library

## Instalación y Uso

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Ejecutar pruebas
npm run test
```

## Características Principales
- Autenticación basada en número telefónico
- Validación de números colombianos (+57)
- Sistema de verificación por código
- Manejo de estados de carga
- Sistema de temporizador para reenvío de códigos

## Testing
```bash
# Ejecutar pruebas unitarias
npm run test

```

## Contacto
Para dudas o aclaraciones sobre la implementación, contactar al equipo de desarrollo.
## Support

For support, email licerol@uninorte.edu.co

