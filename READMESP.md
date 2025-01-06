# project-airports
World Travel, Inc. Technical Interview

# Airport Atlas

## Resume:
Aplicación para almacenar aeropuertos a nivel mundial, algunos visitados y otros por visitar, tienes alguna historia única o anécdota que te haya sucedido en algún aeropuerto? Incluso notas que quieras guardar, mantén un registro de tus historias de vuelo. Agrega lugares y empieza tu historia

## Documentation
### Database:
Herramientas:
Use PostgreSQL tal y como fue pedido, creando 2 tablas, una para usuarios y otra para los aeropuertos a agregar. Mas adelante en la sección de despliegue enseño como fue subido a AWS, por ahora, hablaremos de forma local, hace falta tener instalado PosgreSQL en la maquina y dentro del archivo de settings.py del backend, agregar los datos requeridos.

## Backed y tests:

Para el backend, como fue solicitado usar Python, utilice el framework Django debido a mi familiaridad con el mismo, al tratarse de un proyecto tan pequeño y solo a forma de presentación, tome la decisión de tener una arquitectura muy monolítica donde el el archivo view.py realice desde la api hasta la consulta de la base de datos, esto fue así debido a la sencillez del proyecto en cuestión y la poca disponibilidad de tiempo que cuento en este momento, en un entorno ideal lo mejor para estor proyectos seria tener bien delimitada cada capa, llevandolo a una arquitectura en 4 capas, que serian modelo, logc, acceso a datos y la api como tal.
Mejoras:
Por lo tanto la implementación del backen puede mejorar casi un 100% pero no fue requerido para esta instancia, actualmente cumple su función.
Tests:
Para testear la aplicación es necesario ubicarse en el proyecto y correr el comando 
“python manage.py test”
En el único lugar donde se implementaron tests fue en el backend, dado a la naturalidad con la que el frontend cambia y el poco tiempo disponible. A largo plazo se podrían implementar para todos los proyectos.

## Frontend:

Herramientas:
Para el frontend fue solicitado la utilización de react, por mi parte para realizar un desarrollo mas fluido utilice la herramienta de vite que no contiene ninguna contramedida para este tipo de proyectos. 
Debido al poco tiempo dispuesto, opte por utilizar Bootstrap para los estilos de la aplicación, debido a que usar puro CSS no era necesario en este caso, otra opción valida que estuve por tomar fue la utilización de tailwind pero opte por la sencillez de Bootstrap.
Que se hizo:
Se realizo una pagina estilo SPA en la que solo hay algunas rutas para lo solicitado, lectura, creación, edición y eliminación de los objetos, en este caso, aeropuertos.
Estados:
Para el manejo de estados se dejo la libertad de utilizar tanto redux como react context, en mi caso opte por redux debido a la familiaridad del mismo, pero para este tipo de proyectos tan pequeños, react context es mas que suficiente, tomando en cuenta que redux se ha dejado de utilizar a escala global últimamente.
El manejo de estados es muy sencillo, se realiza una llamada al api y se guardan todos los aeropuertos en el store de redux, luego se agregan, eliminan o editan desde la misma.
Mejoras:
El front cuenta con muchas mejoras que hacer al igual que el backend, los estilos se podrían mejorar, mensajes de error a la hora de la no creación de objetos, por ejemplo, solo muestro que el nombre y el ICAO son necesarios, pero no los muestro en la UI de forma mas eficiente. 
De la misma forma, el login no expone ningún error, en caso de que no se pueda loguear, no da aviso de que algo esta mal, esto fue debido a el poco tiempo tomado, cuando la app ya estaba en AWS note este caso. Luego, para loguear y desloguear recargo la pagina para borrar los estados de redux, cosa totalmente mejorable.

## Bugs:
A la hora de editar aeropuertos, si editamos el mismo mas de una vez, el estado de visited se pierde y se torna false, notado después de pruebas en AWS.

## AWS.
Como se pedía, realice un despliegue en AWS teniendo en cuenta los 6 pilares, por lo tanto, paso a explicar brevemente cada uno de ellos y la forma de haberlo hecho.
### RDS – PostgreSQL
### EC2-Django Backend
### S3-React Frontend
1. **Operational Excellence**  
La arquitectura utiliza servicios gestionados como RDS para la base de datos y EC2 para el backend Django, lo que facilita la operación y mantenimiento del sistema.  
Falto la creación de CI/CD para la automatización de la misma.

2. **Seguridad**  
Con la utilización de servicios como RDS y EC2, puedes gestionar permisos y controles de acceso mediante IAM (Identity and Access Management). La base de datos está cifrada en reposo y en tránsito, y el tráfico entre servicios está protegido mediante VPCs, grupos de seguridad y políticas restrictivas.

3. **Fiabilidad**  
La configuración incluye RDS con multi-AZ para garantizar alta disponibilidad y tolerancia a fallos. EC2 también puede ser configurado con replicación automatizada o escalabilidad horizontal para manejar aumentos de tráfico sin interrupciones. El uso de servicios gestionados ayuda a reducir el riesgo de tiempo de inactividad.

4. **Eficiencia en el Rendimiento**  
El frontend React desplegado en S3, asegura un contenido entregado de manera eficiente y rápida a los usuarios, optimizando los tiempos de carga. Además, servicios como EC2 permiten ajustar recursos según la demanda, logrando una distribución eficiente de recursos.

5. **Optimización de Costos**  
Utilizar RDS y EC2 con escalabilidad permite optimizar los costos en función de la carga real. AWS también ofrece opciones de reservas o instancias bajo demanda, lo que reduce costos innecesarios. El frontend en S3 permite costos bajos en almacenamiento y distribución de contenido estático.

6. **Sostenibilidad**  
AWS cuenta con una serie de prácticas sostenibles, como el uso de instancias EC2 bajo demanda y RDS con opciones optimizadas para la eficiencia energética. Además, la región seleccionada puede impactar positivamente en la reducción de huella de carbono.

La configuración con RDS para la base de datos PostgreSQL, EC2 para el backend Django y S3 para el frontend React cumple con estos 6 pilares al ofrecer una arquitectura escalable, segura, fiable y económica, optimizando el rendimiento y la sostenibilidad del sistema.

## Como probarlo:
Tener instalado PostgreSQL en la maquina.  
Clonar el repositorio, levantar dos terminales, una para el servidor backend y otra para el frontend.  
Para el backend, ubicarse en la carpeta `back_project` e instalar todos los requerimientos dentro de `requirements.txt` con el comando `pip install -r requirements.txt`.  
Luego correr los siguientes comandos para crear las migraciones y aplicar las tablas:

- `python manage.py makemigrations`  
- `python manage.py migrate`

Una vez completado esto, levantar el servidor con el comando `python manage.py runserver`. Esto ya nos permitirá conectarlo con el frontend, que tiene una URL por defecto en el puerto 8000. En caso de que su puerto sea diferente, cambiarlo manualmente.

Para levantar el frontend, corremos el siguiente comando dentro de la carpeta `front-project`:

- `npm install`

Luego, iniciamos el desarrollo con:

- `npm run dev`

Esto será suficiente para tener acceso a toda la aplicación.
