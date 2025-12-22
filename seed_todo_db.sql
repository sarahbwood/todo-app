--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4
-- Dumped by pg_dump version 15.4

-- Started on 2025-12-18 15:34:38

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 217 (class 1259 OID 16406)
-- Name: todos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.todos (
    id integer NOT NULL,
    title text NOT NULL,
    completed boolean,
    created_at timestamp with time zone,
    user_id integer NOT NULL
);


ALTER TABLE public.todos OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 16405)
-- Name: todos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.todos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.todos_id_seq OWNER TO postgres;

--
-- TOC entry 3336 (class 0 OID 0)
-- Dependencies: 216
-- Name: todos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.todos_id_seq OWNED BY public.todos.id;


--
-- TOC entry 215 (class 1259 OID 16399)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username text NOT NULL,
    password text
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 16398)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 3337 (class 0 OID 0)
-- Dependencies: 214
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 3179 (class 2604 OID 16409)
-- Name: todos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.todos ALTER COLUMN id SET DEFAULT nextval('public.todos_id_seq'::regclass);


--
-- TOC entry 3178 (class 2604 OID 16402)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3330 (class 0 OID 16406)
-- Dependencies: 217
-- Data for Name: todos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.todos (id, title, completed, created_at, user_id) FROM stdin;
2	Clean oven	f	2025-10-27 03:00:00+02	2
4	Clean floor	t	2025-10-27 03:00:00+02	2
5	Wash dishes	f	2025-11-02 14:57:35.315307+02	2
6	Wash dishes	f	2025-11-02 15:02:24.970418+02	2
7	Go to the gym	t	2025-11-02 15:20:44.18742+02	2
8	Pick up John	f	2025-11-02 15:23:39.041513+02	2
9	Pilates @ 5pm	f	2025-11-16 13:06:32.644349+02	2
10	Buy milk	f	2025-11-16 13:24:27.183242+02	5
16	Bake cake	f	2025-11-16 13:59:05.941582+02	5
17	Buy shoe polish	f	2025-11-16 14:00:06.305017+02	5
18	Mow grass	f	2025-11-16 14:15:07.841955+02	5
19	Hair appointment @ 3pm	f	2025-11-16 14:16:02.544167+02	5
20	Clean shower	f	2025-11-16 14:18:15.174796+02	5
21	Mop floors	f	2025-11-16 14:19:39.514165+02	5
13	Buy eggs	f	2025-11-16 13:52:10.99418+02	5
12	1km run	f	2025-11-16 13:36:13.293663+02	5
11	Vacuum car	f	2025-11-16 13:34:54.927806+02	2
22	Eat leftovers	f	2025-11-16 14:35:02.639123+02	5
23	Test	f	2025-11-16 17:17:40.990848+02	5
24	test	f	2025-11-16 17:17:49.864978+02	5
25	Sweep kitchen	f	2025-11-16 19:51:02.915593+02	20
26	Hang washing	f	2025-11-16 19:51:23.823899+02	20
\.


--
-- TOC entry 3328 (class 0 OID 16399)
-- Dependencies: 215
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, password) FROM stdin;
2	admin	test@123
5	anne	$2b$12$dcXqYNZLyq0ldYdi15.je.ASU9QGD4gZYRnSN037g5JGnEe1rklPK
6	dan	$2b$12$ZiFiIt.W6KeovtiQtF0jDOQI9i3BM9iVNXgfN5o9Sn4SZlx0NGGUu
8	evan	$2b$12$.NpWfm3iwKk1AHVWrbiDMe43rq5F.dJVZEcvWykDCdv5lekFH5Op6
9	fred	$2b$12$nKo4f5vY7t4DGtbujI1CmOgaZrYx.ctFqT8AJsVA.SFWSPN2PAx3q
10	gavin	$2b$12$RH89b/UT9V0nOqXG0CxOHeuo7l5628ykFBjR0H5iMdP7HF11nKi2m
11	harry	$2b$12$zFfm//MyLSlfCnIKsiWh8.UBJuQB1D2M.6AHoRelDhSphK6O0v10m
12	isaac	$2b$12$YSsPsUThj8Bpu6SreuacIe2ii3V9hsZiPueU9wMG8ZJLU7rLM5fuq
13	james	$2b$12$Ca02uMYqyvHg66rpu2ceJuSpzKQjrO7Olskc7QQmOXsnnfWyLiwO6
14	kim	$2b$12$GnR2o4oOh.zf3qErfNaASuKpmxa2VeIRV4NyPYyfGt9yqhr0K/yqa
15	linda	$2b$12$.5Dw036Pa5f0wR1Ol.Ua/OAfRhOPdnm/GIejLeEZ3i/9zZ0yUnVwu
16	mia	$2b$12$hAJ4pPgh6LBsHbWH3t8Iy.O1s3SqkF3Ba2tx/1P.HPX4SEghrUEUS
17	nelly	$2b$12$pPnU1F64Y3JO1H1MXJGlx.CnehRZsCPSI7Vl11ETr4KyK1SfoK4A2
18	polly	$2b$12$VgOwA5la1.lVzzmY8tsMt.Bp6ikIVyv5ksnGZUszEOMXGCR2MQcHO
19	quin	$2b$12$moS9SJVvMqPHSgsMuz0c9uriFTu.S52My84quDksUnmUyJusblUmK
20	rhys	$2b$12$k06GKb91ERxfQGr4ly7JOenAHYGujPerVxg7hzKtxVHahnMACAcVm
\.


--
-- TOC entry 3338 (class 0 OID 0)
-- Dependencies: 216
-- Name: todos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.todos_id_seq', 26, true);


--
-- TOC entry 3339 (class 0 OID 0)
-- Dependencies: 214
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 20, true);


--
-- TOC entry 3181 (class 2606 OID 16420)
-- Name: users uniqueUsername; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "uniqueUsername" UNIQUE (username);


--
-- TOC entry 3183 (class 2606 OID 16404)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3184 (class 2606 OID 16412)
-- Name: todos todos_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.todos
    ADD CONSTRAINT todos_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


-- Completed on 2025-12-18 15:34:39

--
-- PostgreSQL database dump complete
--

