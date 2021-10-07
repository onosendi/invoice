# Invoice App

## Installation

### Application

#### Clone Repository

```
git clone https://github.com/onosendi/invoice.git
cd invoice
```

#### Environment Variables

Create `.env` file next to `package.json` with the following data:

```environment
NEXT_PUBLIC_APP_NAME=Invoice
APP_SECRET=some super secret string
APP_IP=localhost
DB_NAME=invoice
DB_USERNAME=invoice
DB_PASSWORD=invoice
DB_DEBUG=false
```

### NPM

```
npm install
```

### PostgreSQL

#### Set Up Database

Enter PostgreSQL shell with administrator privileges:

```
psql postgres
```

Create database, user, and grant privileges:

```sql
create database invoice;
create user invoice with encrypted password 'invoice';
alter user invoice with superuser;
grant all privileges on database invoice to invoice;
```

#### Migration And Data

```
npx knex migrate:latest
```

### Run Server

```
npm run dev
```
