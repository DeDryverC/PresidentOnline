FROM php:apache
RUN apt-get update
RUN apt-get install curl vim nano git -y
RUN apt-get install npm nodejs -y

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN a2enmod rewrite
RUN a2enmod headers

RUN cd /var/www/html && npm install --global yarn && yarn install

#connection bdd
RUN docker-php-ext-install pdo pdo_mysql


COPY docker/www/presidentonline.conf /etc/apache2/sites-available/presidentonline.conf


RUN a2dissite 000-default.conf
RUN a2ensite presidentonline.conf