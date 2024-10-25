FROM python:3.10  # O la versión base de Python que estés usando

# Añadir Oracle Instant Client al contenedor
RUN apt-get update && apt-get install -y libaio1 wget unzip

# Descargar e instalar el cliente Oracle Instant Client
RUN wget https://download.oracle.com/otn_software/linux/instantclient/instantclient-basiclite-linux.x64-21.5.0.0.0dbru.zip
RUN unzip instantclient-basiclite-linux.x64-21.5.0.0.0dbru.zip -d /opt/oracle
RUN ln -s /opt/oracle/instantclient_21_5/libclntsh.so /usr/lib/libclntsh.so

# Establecer variables de entorno
ENV LD_LIBRARY_PATH /opt/oracle/instantclient_21_5

# Otros comandos para tu entorno de Django
WORKDIR /usr/src/app
COPY . .
RUN pip install -r requirements.txt

CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]
