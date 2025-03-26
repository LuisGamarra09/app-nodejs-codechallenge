# Yape Code Challenge

Este proyecto contiene dos microservicios: `ms-transaction` y `ms-anti-fraud`. A continuación, se detallan los pasos para levantar el entorno completo.

## 🚀 **1. Levantar la infraestructura con Docker**

Primero, asegúrate de tener Docker y Docker Compose instalados. Luego, desde la raíz del proyecto ejecuta:

```bash
docker-compose up -d
```

Esto iniciará los contenedores necesarios como la base de datos y Kafka.

## 📦 **2. Instalar dependencias del microservicio `ms-transaction`**

Accede a la carpeta del microservicio:

```bash
cd ms-transaction
```

Instala las dependencias necesarias:

```bash
npm install
```

### 🛠️ **3. Ejecutar migraciones en `ms-transaction`**

Para crear las tablas en la base de datos, ejecuta:

```bash
npm run migrate
```

### 🚀 **4. Levantar el microservicio `ms-transaction`**

Inicia el servicio con el siguiente comando:

```bash
npm run start
```

El microservicio estará corriendo y conectado a la infraestructura.

---

## 📦 **5. Instalar dependencias del microservicio `ms-anti-fraud`**

**Abre una nueva terminal** y accede al microservicio `ms-anti-fraud`:

```bash
cd ms-anti-fraud
```

Instala sus dependencias:

```bash
npm install
```

### 🚀 **6. Levantar el microservicio `ms-anti-fraud`**

Finalmente, inicia el microservicio anti-fraude:

```bash
npm run start
```

---

## ✅ **7. Verificación final**

- Asegúrate de que ambos microservicios están corriendo sin errores.
- Verifica que la base de datos está creada y accesible.
- Confirma que Kafka está levantado y escuchando en el puerto `9092`.

### 🔥 **8. Probar con Postman**

Para verificar el funcionamiento de los microservicios, ejecuta las colecciones de Postman incluidas en el proyecto:

1. Abre Postman.
2. Importa la colección `yape.postman_collection.json` ubicada en la raíz del proyecto.
3. Prueba los endpoints de cada microservicio.


