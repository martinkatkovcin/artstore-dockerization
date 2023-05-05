create table users
(
    id           serial
        primary key,
    first_name   varchar(255)             not null,
    last_name    varchar(255)             not null,
    username     varchar(255)             not null,
    password     varchar(255)             not null,
    email        varchar(255)             not null,
    phone_number varchar(255)             not null,
    role         varchar(255)             not null,
    "createdAt"  timestamp with time zone not null,
    "updatedAt"  timestamp with time zone not null
);

alter table users
    owner to postgres;

create table payment_methods
(
    id          serial
        primary key,
    name        varchar(255)             not null,
    "createdAt" timestamp with time zone not null,
    "updatedAt" timestamp with time zone not null
);

alter table payment_methods
    owner to postgres;

create table delivery_methods
(
    id          serial
        primary key,
    name        varchar(255)             not null,
    "createdAt" timestamp with time zone not null,
    "updatedAt" timestamp with time zone not null
);

alter table delivery_methods
    owner to postgres;

create table vouchers
(
    id          serial
        primary key,
    code        varchar(255)             not null,
    discount    double precision         not null,
    is_active   boolean                  not null,
    "createdAt" timestamp with time zone not null,
    "updatedAt" timestamp with time zone not null
);

alter table vouchers
    owner to postgres;

create table product_periods
(
    id          serial
        primary key,
    name        varchar(255)             not null,
    "createdAt" timestamp with time zone not null,
    "updatedAt" timestamp with time zone not null
);

alter table product_periods
    owner to postgres;

create table product_topics
(
    id          serial
        primary key,
    name        varchar(255)             not null,
    "createdAt" timestamp with time zone not null,
    "updatedAt" timestamp with time zone not null
);

alter table product_topics
    owner to postgres;

create table product_materials
(
    id          serial
        primary key,
    name        varchar(255)             not null,
    "createdAt" timestamp with time zone not null,
    "updatedAt" timestamp with time zone not null
);

alter table product_materials
    owner to postgres;

create table orders
(
    id                 serial
        primary key,
    first_name         varchar(255),
    last_name          varchar(255),
    email              varchar(255),
    phone_number       varchar(255),
    address            varchar(255)             not null,
    city               varchar(255)             not null,
    zip_code           integer                  not null,
    finished           boolean                  not null,
    payment_method_id  bigint                   not null
        references payment_methods,
    delivery_method_id bigint                   not null
        references delivery_methods,
    user_id            bigint
        references users,
    voucher_id         bigint
        references vouchers,
    "createdAt"        timestamp with time zone not null,
    "updatedAt"        timestamp with time zone not null
);

alter table orders
    owner to postgres;

create table products
(
    id                  serial
        primary key,
    title               varchar(255)             not null,
    description         varchar(255)             not null,
    image_path          varchar(255),
    price               double precision         not null,
    product_period_id   bigint                   not null
        references product_periods,
    product_topic_id    bigint                   not null
        references product_topics,
    product_material_id bigint                   not null
        references product_materials,
    "createdAt"         timestamp with time zone not null,
    "updatedAt"         timestamp with time zone not null
);

alter table products
    owner to postgres;

create table user_carts
(
    id          serial
        primary key,
    order_id    bigint                   not null
        references orders,
    product_id  bigint                   not null
        references products,
    "createdAt" timestamp with time zone not null,
    "updatedAt" timestamp with time zone not null
);

alter table user_carts
    owner to postgres;


-- INSERT
insert into public.vouchers
values  (2, 'ZLAVA20', 0.2, true, '2023-05-01 14:43:25.771000 +00:00', '2023-05-01 14:43:30.361000 +00:00');

insert into public.delivery_methods
values  (1, 'Personal pickup', '2023-04-09 16:15:14.748000 +00:00', '2023-04-09 16:15:14.748000 +00:00'),
        (2, 'Postal delivery', '2023-04-09 16:15:14.748000 +00:00', '2023-04-09 16:15:14.748000 +00:00'),
        (3, 'DHL delivery', '2023-04-09 16:15:14.748000 +00:00', '2023-04-09 16:15:14.748000 +00:00');

insert into public.payment_methods
values  (1, 'Credit card', '2023-04-09 16:15:14.711000 +00:00', '2023-04-09 16:15:14.711000 +00:00'),
        (2, 'Cash on delivery', '2023-04-09 16:15:14.711000 +00:00', '2023-04-09 16:15:14.711000 +00:00'),
        (3, 'PayPal', '2023-04-09 16:15:14.711000 +00:00', '2023-04-09 16:15:14.711000 +00:00'),
        (4, 'Apple pay', '2023-04-09 16:15:14.711000 +00:00', '2023-04-09 16:15:14.711000 +00:00'),
        (5, 'Google pay', '2023-04-09 16:15:14.711000 +00:00', '2023-04-09 16:15:14.711000 +00:00');

insert into public.product_materials
values  (1, 'Wood', '2023-04-09 16:15:14.756000 +00:00', '2023-04-09 16:15:14.756000 +00:00'),
        (2, 'Stone', '2023-04-09 16:15:14.756000 +00:00', '2023-04-09 16:15:14.756000 +00:00'),
        (3, 'Marble', '2023-04-09 16:15:14.756000 +00:00', '2023-04-09 16:15:14.756000 +00:00'),
        (4, 'Iron/Steel', '2023-04-09 16:15:14.756000 +00:00', '2023-04-09 16:15:14.756000 +00:00'),
        (5, 'Oil on canvas', '2023-04-09 16:15:14.756000 +00:00', '2023-04-09 16:15:14.756000 +00:00'),
        (6, 'Watercolor', '2023-04-09 16:15:14.756000 +00:00', '2023-04-09 16:15:14.756000 +00:00'),
        (7, 'Acrylic', '2023-04-09 16:15:14.756000 +00:00', '2023-04-09 16:15:14.756000 +00:00'),
        (8, 'Paper', '2023-04-09 16:15:14.756000 +00:00', '2023-04-09 16:15:14.756000 +00:00'),
        (9, 'Clay', '2023-04-09 16:15:14.756000 +00:00', '2023-04-09 16:15:14.756000 +00:00');

insert into public.product_periods
values  (1, 'Antique', '2023-04-09 16:15:14.753000 +00:00', '2023-04-09 16:15:14.753000 +00:00'),
        (2, 'Romanesque', '2023-04-09 16:15:14.753000 +00:00', '2023-04-09 16:15:14.753000 +00:00'),
        (3, 'Gothic', '2023-04-09 16:15:14.753000 +00:00', '2023-04-09 16:15:14.753000 +00:00'),
        (4, 'Renaissance', '2023-04-09 16:15:14.753000 +00:00', '2023-04-09 16:15:14.753000 +00:00'),
        (5, 'Baroque', '2023-04-09 16:15:14.753000 +00:00', '2023-04-09 16:15:14.753000 +00:00'),
        (6, 'Neoclassicism', '2023-04-09 16:15:14.753000 +00:00', '2023-04-09 16:15:14.753000 +00:00'),
        (7, 'Romanticism', '2023-04-09 16:15:14.753000 +00:00', '2023-04-09 16:15:14.753000 +00:00'),
        (8, 'Realism', '2023-04-09 16:15:14.753000 +00:00', '2023-04-09 16:15:14.753000 +00:00'),
        (9, 'Impressionism', '2023-04-09 16:15:14.753000 +00:00', '2023-04-09 16:15:14.753000 +00:00'),
        (10, 'Expressionism', '2023-04-09 16:15:14.753000 +00:00', '2023-04-09 16:15:14.753000 +00:00'),
        (11, 'Surrealism', '2023-04-09 16:15:14.753000 +00:00', '2023-04-09 16:15:14.753000 +00:00'),
        (12, 'Pop-Art', '2023-04-09 16:15:14.753000 +00:00', '2023-04-09 16:15:14.753000 +00:00'),
        (13, 'Contemporary', '2023-04-09 16:15:14.753000 +00:00', '2023-04-09 16:15:14.753000 +00:00');

insert into public.product_topics
values  (1, 'Nature', '2023-04-09 16:15:14.751000 +00:00', '2023-04-09 16:15:14.751000 +00:00'),
        (2, 'Still life', '2023-04-09 16:15:14.751000 +00:00', '2023-04-09 16:15:14.751000 +00:00'),
        (3, 'Architecture', '2023-04-09 16:15:14.751000 +00:00', '2023-04-09 16:15:14.751000 +00:00'),
        (4, 'Abstract', '2023-04-09 16:15:14.751000 +00:00', '2023-04-09 16:15:14.751000 +00:00'),
        (5, 'Historical', '2023-04-09 16:15:14.751000 +00:00', '2023-04-09 16:15:14.751000 +00:00'),
        (6, 'Sacral', '2023-04-09 16:15:14.751000 +00:00', '2023-04-09 16:15:14.751000 +00:00');


insert into public.products
values  (22, 'Famous painting', 'Van Gogh - XXXX year - Painting...', 'uploads/image-1682151191204-399468176.jpg', 1337.23, 8, 4, 6, '2023-04-22 08:13:11.210000 +00:00', '2023-04-22 08:13:11.210000 +00:00'),
        (23, 'Mona Lisa', 'Da Vinci - XXXX year - Painting...', 'uploads/image-1682151369647-322139159.jpg', 652, 6, 2, 2, '2023-04-22 08:16:09.649000 +00:00', '2023-04-22 08:16:09.649000 +00:00'),
        (24, 'Cat', 'Majster N- XXXX year - Painting...', 'uploads/image-1682151499084-955904097.jpg', 652, 7, 1, 5, '2023-04-22 08:18:19.086000 +00:00', '2023-04-22 08:18:19.086000 +00:00'),
        (25, 'AI fantasy', 'AI generated - 2022 winner of AI', 'uploads/image-1682151540301-70355976.jpg', 989, 5, 2, 7, '2023-04-22 08:19:00.314000 +00:00', '2023-04-22 08:19:00.314000 +00:00'),
        (26, 'Woman mozaik', 'Matej Hrnčír - Na kolene...', 'uploads/image-1682155059606-570276674.jpg', 555.55, 3, 1, 3, '2023-04-22 09:17:39.610000 +00:00', '2023-04-22 09:17:39.610000 +00:00'),
        (27, 'African woman art', 'Martin Kejtkovic - Jou...', 'uploads/image-1682155152038-39431398.jpg', 987.23, 4, 2, 5, '2023-04-22 09:19:12.044000 +00:00', '2023-04-22 09:19:12.044000 +00:00');
