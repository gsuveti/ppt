/// <reference path="../typings/main.d.ts" />

"use strict";

import * as dbConst from '../constants/db.json';
var Company = require('../api/company/model/company-model');
var SummerPracticeProgram = require('../api/company/model/summerPracticeProgram-model');
var serverConstants = require('../constants/server.json');
var q = require('q');

export class SeedConfig {

    static init():void {

        var companies = [
            {
                name: "AMDARIS",
                description: "",
                web: "http://amdaris.com/",
                summerPracticePrograms: [
                    {
                        name: "SC AMDARIS ROMANIA SRL",
                        contactPerson: "NEAGU ADELINA-LIA",
                        contactPersonTitle: "Talent Manager",
                        contactPersonEmail: "adelina.neagu@amdaris.com",
                        numberOfStudents: "10 din care deja angajați în companie 0",
                        period: "11 iulie 2016 – 11 octombrie 2016",
                        description: "Construirea unui sistem informational simplu cu ajutorul tehnologiilor invatate ( exemplu : ASP.NET MVC, Hibernate, MsSQL, C#",
                        requirements: "Cunoastere a unui limbaj de programare procedural sau obiect-orientat * cunoastere de baza a algoritmelor si structurelor de date Cerinte extra :  * cunoastere bazelor programarii orientate pe obiecte * cunostintele elementare despre baze de date * cunoastere crearii web site-urilor",
                        isPaid: "true"
                    }
                ]
            }, {
                name: "SYONIC",
                description: "Syonic a dezvoltat si opereaza sistemul informatic medical icMED. Sistemul, bazat pe tehnologii web, acopera peste 10 milioane de cetateni din Romania si este utilizat de un numar de 3000 de furnizori de servicii medicale (cabinete de medicina de familie, policlinici si spitale). Toti furnizorii sunt interconectati prin fisa electronica unica a pacientului. Sistemul acopera atat activitatea medicala din cabinet sau spital, cat si activitatea administrativa, folosind interfete grafice customizate si optimizate pentru aceste functii. Numarul de consultatii care sunt efectuate zilnic in icMED este de 100.000.",
                web: "http://www.icmed.ro",
                summerPracticePrograms: [
                    {
                        name: "Sediul Central – Timisoara (etaj 6)",
                        contactPerson: "Leonard Mada",
                        contactPersonTitle: "Sef Departament Cercetare",
                        contactPersonEmail: "leo.mada@syonic.eu",
                        numberOfStudents: "3",
                        period: "10.07 – 15.09",
                        description: "Dezvoltarea unei componente pentru procesarea unor informatii linkate si vizualizarea grafurilor rezultate. Dezvoltarea de aplicatii mobile care sa interactioneze cu sistemul icMED. Infrastructura existenta in icMED permite conectarea facila a unor aplicatii mobile. Evolutia tehnologiilor medicale din ultimii ani a creat oportunitati majore pentru aplicatii mobile medicale. Implementarea de module si functionalitati noi in icMED. Arhitectura modulara a sistemului permite usor implementarea unor functii noi. Definirea si implementarea unor functii inteligente pentru asistarea deciziei medicale – se poate baza si pe datele existente in baza de date icMED (peste 40 milioane de consultatii).",
                        requirements: "Micrososft C#, MS SQL, HTML, cunostinte de js sau de tehnologii mobile pot fi utile",
                        isPaid: "false"
                    }
                ]
            }, {
                name: "AUTOLIV",
                description: "Autoliv este o companie americano-suedeză producatoare de sisteme de siguranta auto. În Timișoara, este situat cel mai mare centru R&D Autoliv la nivel global, care dezvoltă sisteme electronice de siguranță pasivă (sisteme electronice pentru centuri de siguranță și airbag, etc.) și activă (sisteme de radar, sisteme de camera vision și night vision, funcționalități pentru mașina autonomă, etc.).",
                web: "www.autoliv.com",
                summerPracticePrograms: [
                    {
                        name: "Locul de practică 1",
                        contactPerson: "Daniela Duciuc",
                        contactPersonTitle: "HR",
                        contactPersonEmail: "daniela.duciuc@autoliv.com",
                        numberOfStudents: "9",
                        period: "11.07.2016 – 31.08.2016",
                        description: "Dezoltare software, Testare software",
                        requirements: "Limbajul de programare C",
                        isPaid: "true"
                    }
                ]
            }, {
                name: "COBALT SIGN",
                description: "Suntem o echipă tânără, pasionată de dezvoltarea aplicațiilor mobile pentru iPhone, Android și Windows. Lucrăm cu entuziasm la diverse aplicații ale clienților: Vocea României, PetitChef, PLAI Festival etc. dar dezvoltăm și aplicațiile noastre proprii, precum Ready Set Holiday!. Compania a fost fondată în 2011 și am realizat peste 60 aplicații mobile pentru startup-uri și companii din Europa, Romania și SUA. Mai multe detalii despre noi puteți afla pe website.",
                web: "http://www.cobaltsign.com/",
                summerPracticePrograms: [
                    {
                        name: "Dezvoltare aplicații mobile - Android",
                        contactPerson: "Csertus, Oana",
                        contactPersonTitle: "Co-fondator",
                        contactPersonEmail: "oana.csertus@cobaltsign.com",
                        numberOfStudents: "1",
                        period: "11 iulie – 19 august sau 22 august – 30 septembrie",
                        description: "Dezvoltarea de aplicații mobile pentru platforma Android. Aceasta presupune atât UI cat si backend, lucrul cu diverse servicii web si biblioteci. Folosire tool-uri de colaborare precum: Git, HipChat, Jira, Confluence",
                        requirements: "Programare orientata pe obiecte, Cunoștințe de baza Java sau .NET",
                        isPaid: "false"
                    }, {
                        name: "Dezvoltare aplicații mobile - iOS",
                        contactPerson: "Csertus, Oana",
                        contactPersonTitle: "Co-fondator",
                        contactPersonEmail: "oana.csertus@cobaltsign.com",
                        numberOfStudents: "1",
                        period: "11 iulie – 19 august sau 22 august – 30 septembrie",
                        description: "Dezvoltarea de aplicații mobile pentru platforma iOS. Aceasta presupune atât UI cat si backend, lucrul cu diverse servicii web si biblioteci. Folosire tool-uri de colaborare precum: Git, HipChat, Jira, Confluence",
                        requirements: "Programare orientata pe obiecte, Cunoștințe de baza Java sau .NET",
                        isPaid: "false"
                    }
                ]
            }, {
                name: "EBS Romania",
                description: "Fondat în anul 2000, Grupul EBS este unul dintre cei mai importanți furnizori de soluții și servicii software din România. În anul 2003 a devenit societate românească independentă, iar în noiembrie 2013 a fost preluată de concernul japonez NTT DATA, situat în top 10 mondial al furnizorilor de servicii IT. EBS Romania are sediul central în Cluj-Napoca și filiale în București, Sibiu, Brașov, Timișoara și Iași. Echipa  numără aproximativ 800 de angajați și colaboratori externi. În calitate de student, EBS îți oferă o multitudine de provocări şi perspective de promovare optime în domeniul ingineriei software. Toate aceste oportunități sunt posibile pentru că suntem o organizație orientată către performanță, atât în ceea ce privește evoluția în carieră, cât și în standardele pe care ni le stabilim în oferta de produse și servicii.",
                web: "",
                summerPracticePrograms: [
                    {
                        name: "Software Development of an Enterprise Application using Scrum - in EBS Romania, Timisoara",
                        contactPerson: " Orfescu Linda",
                        contactPersonTitle: "Business Support Functions Manager",
                        contactPersonEmail: "linda.orfescu@ebsromania.ro",
                        numberOfStudents: "4",
                        period: "11 iulie – 2 septembrie 2016",
                        description: "Practicantul va participa la dezvoltarea unei aplicaţii Enterprise folosind metodologia Scrum. Va participa la traininguri specifice proiectului, organizate de către EBS şi va fi implicat în dezvoltarea efectivă a unei aplicaţii cu finalitate practică, dezvoltare care se va realiza lucrând sub supervizare şi în echipă. Perioada de practică se poate continua cu oferirea unui contract de bursă, în funcţie de feedback-ul obţinut.",
                        requirements: "Cunoştinte Java - nivel general, Reprezintă un plus cunoştinţele de SQL, HTML, Javascript",
                        isPaid: "false"
                    }, {
                        name: "MAVEN Plugin for Detecting Package Dependency – in EBS Romania, Timisoara",
                        contactPerson: " Orfescu Linda",
                        contactPersonTitle: "Business Support Functions Manager",
                        contactPersonEmail: "linda.orfescu@ebsromania.ro",
                        numberOfStudents: "1",
                        period: "11 iulie – 2 septembrie 2016",
                        description: "Practicantul va dezvolta un plugin Maven, care va fi un proiect Open Source, prin care se vor detecta eventualele dependenţe ciclice ale pachetelor unui proiect sau se vor valida anumite dependenţe, în funcţie de anumite reguli. Perioada de practică se poate continua cu oferirea unui contract de bursă, în funcţie de feedback-ul obţinut.",
                        requirements: "Cunoştinţe Java, Cunoştinţe Maven şi/sau Maven plugins – nice to have",
                        isPaid: "false"
                    }
                ]
            }, {
                name: "Huf Romania",
                description: "Huf Romania este o investitie a grupului Huf Hülsbeck & Fürst GmbH, producator de echipamente pentru accesul, securitatea si imobilizarea autovehiculelor. Fabrica din Arad si-a inceput activitatea de productie in luna Octombrie 2006. Centrul R&D din Timisoara si-a inceput activitatea in Aprilie 2011. Huf Hülsbeck & Fürst a fost fondata in 1908 la Velbert ca si o afacere de familie. Compania a livrat primele produse catre Mercedes Benz, fiind totodata si prima companie care a dezvoltat componente pentru accesul in masina cu sisteme „Passive Entry” si „Keyless Go”. Astazi, Grupul Huf are peste 7.200 de angajati in 14 tari din intreaga lume.",
                web: "www.huf-group.com ",
                summerPracticePrograms: [
                    {
                        name: "Locul de practică 1",
                        contactPerson: "Profir Cristina",
                        contactPersonTitle: "Specialist Resurse Umane",
                        contactPersonEmail: "Cristina.Profir@huf-group.com",
                        numberOfStudents: "2",
                        period: "01.07.2016 – 15.09.2016, 4 ore/zi",
                        description: "Dezvoltarea unui proiect individual in cadrul departamentului Software Development impreuna cu un expert tehnic din cadrul companiei.",
                        requirements: "Student la orice Universitate cu profil tehnic (Electronica, Automatica si Calculatoare, Infomatica, etc.), Cunostinte de baza de limbaj de programare C si microcontrollere, Limba engleza (scris si vorbit)",
                        isPaid: "true"
                    }, {
                        name: "Locul de practică 1",
                        contactPerson: "Profir Cristina",
                        contactPersonTitle: "Specialist Resurse Umane",
                        contactPersonEmail: "Cristina.Profir@huf-group.com",
                        numberOfStudents: "2",
                        period: "01.07.2016 – 15.09.2016, 4 ore/zi",
                        description: "Dezvoltarea unui proiect individual in cadrul departamentului Software Testing impreuna cu un expert tehnic din cadrul companiei.",
                        requirements: "Student la orice Universitate cu profil tehnic (Electronica, Automatica si Calculatoare, Infomatica), Bune cunostinte de electronica, Limba engleza (scris si vorbit)",
                        isPaid: "true"
                    }
                ]
            }, {
                name: "NOKIA",
                description: "Nokia is a global leader in the technologies that connect people and things. Headquartered in Espoo, Finland, and with operations around the world, Nokia invests in the technologies of the future. In 2016 Alcatel-Lucent joins Nokia to become an innovation leader in next-generation networks & services. We create & enable new & extraordinary experiences in people’s lives through technology. We are in 100+ countries with 2 businesses. Nokia:  provides broadband infrastructure, software &  services. Nokia Technologies: explores where technology can take us next. Our vision is to expand the human possibilities of the connected world. We want to create and enable new and extraordinary experiences in people’s lives through technology that is grounded in real human needs.See our latest video: https://www.youtube.com/watch?v=aYm7hh9ys0c",
                web: "http://www.nokia.com",
                summerPracticePrograms: [
                    {
                        name: "Locuri de practică",
                        contactPerson: "Ciocan Florin; Tal Ariana",
                        contactPersonTitle: "Universities relationship coordinator; Student engagement&University relations",
                        contactPersonEmail: "florin.ciocan@nokia.com; ariana.tal@nokia.com",
                        numberOfStudents: "75",
                        period: "",
                        description: "https://onedrive.live.com/redir?resid=64A23A21B50D68A9!27716&authkey=!AMnQPCqFBs8544k&ithint=file%2cpdf",
                        requirements: "",
                        isPaid: "true"
                    }
                ]
            }, {
                name: "Saguaro",
                description: "With corporate headquarters in California, USA, and technical operations in Timișoara, Romania, Saguaro Technology was founded to create a new and better way to meet the technical engineering resource challenges faced by North American enterprises. Saguaro maintains a tight-knit community of software engineering, quality assurance, and support professionals that provide the highest standards of software engineering, professionalism, and ethical behavior, and do so, within our unique ‘Ownership Model’. Why the ‘Ownership Model’? Many fast-paced enterprises, seeking additional software engineering developers, have had difficulties finding stable, affordable and committed resources. In response, Saguaro pioneered the ‘Ownership Model’. Under this Model, our employees commit to fully owning our client’s goals and objectives and our team members behave just like fellow employees, align with the client’s corporate culture, and embrace the same standards and outcomes set by our clients. Saguaro’s skilled, talented workforce is assembled by and for each specific client, and team members are completely integrated with the client’s internal technical groups.",
                web: "",
                summerPracticePrograms: [
                    {
                        name: "Programator Ajutor – COR 351201",
                        contactPerson: "HIDI TIBERIU",
                        contactPersonTitle: "Administrator Companie, Saguaro Technology, Timisoara Branch",
                        contactPersonEmail: "hr@saguarotech.net",
                        numberOfStudents: "7",
                        period: "2.5 - 3 luni, 8h/zi, contract de munca pe perioada determinată",
                        description: "Project: ProfessionalAFP – Change the UI from MFC to Qt. Change the User Interface for Professional AFP from MFC (Microsoft Foundation Classes) to Qt. This is needed for portability and performance reasons.",
                        requirements: "C++,  MFC, Qt",
                        isPaid: "true"
                    }, {
                        name: "Programator Ajutor – COR 351201",
                        contactPerson: "HIDI TIBERIU",
                        contactPersonTitle: "Administrator Companie, Saguaro Technology, Timisoara Branch",
                        contactPersonEmail: "hr@saguarotech.net",
                        numberOfStudents: "1",
                        period: "2.5 - 3 luni, 8h/zi, contract de munca pe perioada determinată",
                        description: "Project: TotalFlow Prep. Learn how to develop new functionality to a complex job editor used for high-performance document processing, business intelligence and production planning.",
                        requirements: "Java",
                        isPaid: "true"
                    }, {
                        name: "Programator Ajutor – COR 351201",
                        contactPerson: "HIDI TIBERIU",
                        contactPersonTitle: "Administrator Companie, Saguaro Technology, Timisoara Branch",
                        contactPersonEmail: "hr@saguarotech.net",
                        numberOfStudents: "1",
                        period: "2.5 - 3 luni, 8h/zi, contract de munca pe perioada determinată",
                        description: "Project: Printer Controller Modules. Learn how to develop and enhance an automation framework for testing complex software modules for high speed printing devices using Selenium, Apache Ivy, Junit",
                        requirements: "Java",
                        isPaid: "true"
                    }, {
                        name: "Programator Ajutor – COR 351201",
                        contactPerson: "HIDI TIBERIU",
                        contactPersonTitle: "Administrator Companie, Saguaro Technology, Timisoara Branch",
                        contactPersonEmail: "hr@saguarotech.net",
                        numberOfStudents: "1",
                        period: "2.5 - 3 luni, 8h/zi, contract de munca pe perioada determinată",
                        description: "Project: High Availability PDF Thumb Generator with Apache HTTPD & Tomcat. The project is about researching and then implementing a web environment that is scalable and load balanced upon the amount of concurrent requests.",
                        requirements: "Java",
                        isPaid: "true"
                    }, {
                        name: "Programator Ajutor – COR 351201",
                        contactPerson: "HIDI TIBERIU",
                        contactPersonTitle: "Administrator Companie, Saguaro Technology, Timisoara Branch",
                        contactPersonEmail: "hr@saguarotech.net",
                        numberOfStudents: "1",
                        period: "2.5 - 3 luni, 8h/zi, contract de munca pe perioada determinată",
                        description: "Project: Dedicated Print Server module development and deployment. Learn how to develop and integrate individual software modules in a Linux based complex system.",
                        requirements: "C/C++/Linux/scripting",
                        isPaid: "true"
                    }, {
                        name: "Programator Ajutor – COR 351201",
                        contactPerson: "HIDI TIBERIU",
                        contactPersonTitle: "Administrator Companie, Saguaro Technology, Timisoara Branch",
                        contactPersonEmail: "hr@saguarotech.net",
                        numberOfStudents: "1",
                        period: "2.5 - 3 luni, 8h/zi, contract de munca pe perioada determinată",
                        description: "Project: Log Analyzer and Viewer. Develop a log analyzing tool, learn to parse files written in different formats, learn to parse gigabytes of data in shortest time, and learn to output the results in different formats, from files to cloud.",
                        requirements: "C# and Python",
                        isPaid: "true"
                    }, {
                        name: "Programator Ajutor – COR 351201",
                        contactPerson: "HIDI TIBERIU",
                        contactPersonTitle: "Administrator Companie, Saguaro Technology, Timisoara Branch",
                        contactPersonEmail: "hr@saguarotech.net",
                        numberOfStudents: "1",
                        period: "2.5 - 3 luni, 8h/zi, contract de munca pe perioada determinată",
                        description: "Project: Cloud Solution for Automated Invoice Processing. Learn how to design, develop, integrate and publish an application within a modern cloud environment and create a test automation framework.",
                        requirements: "C# / JavaScript",
                        isPaid: "true"
                    }
                ]
            }, {
                name: "Continental",
                description: "Concernul Continental AG este unul dintre furnizorii de top ai industriei auto din lume. În calitate de furnizor de sisteme de frânare, sisteme şi componente pentru trenuri de rulare şi şasiuri, instrumente, soluţii de informare şi divertisment, electronică auto, pneuri şi produse tehnice din elastomeri, Continental contribuie în mod constant la un plus de siguranţă în trafic şi la protecţia climei la nivel global. De asemenea, Continental este un partener în comunicarea auto interconectată. La Continental Automotive în România, peste 7000 de oameni lucrează în centrele de cercetare şi dezvoltare din Timişoara, Sibiu şi Iaşi şi în unităţile de producţie din Sibiu, Timişoara şi Braşov. Inginerii noştri dezvoltă soluţii software, hardware şi de design mecanic pentru aplicaţii în interiorul maşinii, pentru siguranţă, motor şi transmisie, cât şi sisteme de navigaţie şi instrumente de bord pentru viitoarele maşini şi camioane.",
                web: "",
                summerPracticePrograms: [
                    {
                        name: "Locul de practică 1",
                        contactPerson: "Marcovici Maria",
                        contactPersonTitle: "HR Marketing Specialist",
                        contactPersonEmail: " Maria.Marcovici@continental-corporation.com",
                        numberOfStudents: "9",
                        period: "10.07-15.09.2016",
                        description: "https://onedrive.live.com/redir?resid=64A23A21B50D68A9!27715&authkey=!ABzK31nog6XZKxc&ithint=file%2cpdf",
                        requirements: "",
                        isPaid: "true"
                    }
                ]
            }, {
                name: "Atos",
                description: "Atos este unul dintre liderii europeni in servicii de tehnologia informatiei si unul dintre cei mai apreciati angajatori din industria IT, cu venituri anuale in 2014 de 12 miliarde € si 100.000 de angajati in 72 de tari. Grupul Atos este listat pe piata bursiera Euronext Paris. Deservind clienti la nivel global, Grupul Atos furnizeaza servicii de consultanta si integrare de sisteme, servicii de gestionare aplicatii & solutii BPO, operatiuni Cloud, solutii Big Data si de securitate, precum si servicii tranzactionale si de plati electronice. Cu vasta expertiza tehnologica si cunoasterea detaliata a mediului industrial, grupul lucreaza pentru clienti din diferite sectoare de activitate: Aparare, Sanatate, Productie, Media & Utilitati, Sector Public, Vanzari cu amanuntul, Telecomunicatii, Transport. Atos este Partener Global de Tehnologia Informatiei pentru Jocurile Olimpice si Paralimpice si a fost implicat in toate editiile anterioare ale Jocurilor Olimpice din 1992, incluzand cea mai recenta editie a Jocurilor Olimpice de Iarna de la Sochi.mStructura Atos Romania cuprinde doua divizii de operatiuni: Servicii  de Infrastructura si Gestionare Aplicatii (Managed Services - MS), unde peste 1.400 de  specialisti furnizeaza o gama larga de servicii de Infrastructura si Gestionare aplicatii pentru mai mult de 200 de clienti finali din afara Romaniei. Si o a doua divizie: Integrare Sisteme (System Integration – SI) cu peste 70 de  specialisti care  furnizeaza servicii de Project Management, SAP, dirX, Software development;",
                web: "http://ro.atos.net/ro-ro/",
                summerPracticePrograms: [
                    {
                        name: "SAP basis administrare",
                        contactPerson: "Mihaela Plescan",
                        contactPersonTitle: "HR Senior Recruiting Coordinator",
                        contactPersonEmail: "hr-ro.it-solutions@atos.net",
                        numberOfStudents: "3",
                        period: "iulie-septembrie, in functie de disponibilitatea studentului",
                        description: "Administrarea in mediu de test a unor sisteme SAP, asigurarea functionalitatii si integritatea solutii oferite; instalarea, monitorizarea si actualizarea a diverse sisteme SAP",
                        requirements: "Cunostinte teoretice si practice in zona de: programare, administrare retele, testare sau help-desk; sisteme de operare Windows sau Unix-Linux; Database Oracle sau MS SQL. Munca in echipa si dorinta de a invata lucruri noi. Bune abilitati de comunicare",
                        isPaid: "false"
                    }, {
                        name: "Networking administrare",
                        contactPerson: "Mihaela Plescan",
                        contactPersonTitle: "HR Senior Recruiting Coordinator",
                        contactPersonEmail: "hr-ro.it-solutions@atos.net",
                        numberOfStudents: "5",
                        period: "iulie-septembrie, in functie de disponibilitatea studentului",
                        description: "Suport pentru echipa de experti in monitorizarea parametrilor operationali din zona de networking, mentinerea unei documentatii pentru sistemul urmarit, urmarirea implementarii schimbarii in infrastructura conform procedurii predefinita.",
                        requirements: "Cunostinte teoretice si practice in zona de: LAN, WLAN, WAN, Firewall operations; CCNA certified, CCNP. Cunosterea altor technologii de networking: Juniper, Checkpoint, Nortel, Riverbed sunt considerate ca avantaj. Munca in echipa si dorinta de a invata lucruri noi. Bune abilitati de comunicare",
                        isPaid: "false"
                    }, {
                        name: "Relatie si service clienti",
                        contactPerson: "Mihaela Plescan",
                        contactPersonTitle: "HR Senior Recruiting Coordinator",
                        contactPersonEmail: "hr-ro.it-solutions@atos.net",
                        numberOfStudents: "5",
                        period: "iulie-septembrie, in functie de disponibilitatea studentului",
                        description: "Interfata intre echipele tehnice si clientii corporate. Raportare si facilitarea operatiunilor tehnice.",
                        requirements: "Munca in echipa si dorinta de a invata lucruri noi. Bune abilitati de comunicare. Cunoasterea limbii germane ar fi un plus.",
                        isPaid: "false"
                    }, {
                        name: "Inginer SharePoint",
                        contactPerson: "Mihaela Plescan",
                        contactPersonTitle: "HR Senior Recruiting Coordinator",
                        contactPersonEmail: "hr-ro.it-solutions@atos.net",
                        numberOfStudents: "1",
                        period: "iulie-septembrie, in functie de disponibilitatea studentului",
                        description: "Suport pentru echipa de experti in monitorizarea parametrilor operationali din zona de SharePoint, mentinerea unei documentatii pentru sistemul urmarit, urmarirea implementarii schimbarii in infrastructura conform procedurii predefinita.",
                        requirements: "Cunostinte teoretice si practice in zona de: programare, administrare retele, testare sau help-desk; sisteme de operare Windows sau Unix-Linux. Munca in echipa si dorinta de a invata lucruri noi. Bune abilitati de comunicare",
                        isPaid: "false"
                    }, {
                        name: "Exchange Administrator",
                        contactPerson: "Mihaela Plescan",
                        contactPersonTitle: "HR Senior Recruiting Coordinator",
                        contactPersonEmail: "hr-ro.it-solutions@atos.net",
                        numberOfStudents: "1",
                        period: "iulie-septembrie, in functie de disponibilitatea studentului",
                        description: "Suport pentru echipa de experti in monitorizarea parametrilor operationali din zona de Exchange, mentinerea unei documentatii pentru sistemul urmarit, urmarirea implementarii schimbarii in infrastructura conform procedurii predefinita.",
                        requirements: "Cunostinte teoretice si practice in zona de: programare, administrare retele, testare sau help-desk; sisteme de operare Windows sau Unix-Linux. Munca in echipa si dorinta de a invata lucruri noi. Bune abilitati de comunicare",
                        isPaid: "false"
                    }, {
                        name: "Administrator Baze de date Oracle",
                        contactPerson: "Mihaela Plescan",
                        contactPersonTitle: "HR Senior Recruiting Coordinator",
                        contactPersonEmail: "hr-ro.it-solutions@atos.net",
                        numberOfStudents: "3",
                        period: "iulie-septembrie, in functie de disponibilitatea studentului",
                        description: "Suport pentru echipa de experti in monitorizarea parametrilor operationali din zona de Oracle, mentinerea unei documentatii pentru sistemul urmarit, urmarirea implementarii schimbarii in infrastructura conform procedurii predefinita.",
                        requirements: "Cunostinte teoretice si practice in zona de: programare, administrare retele, testare sau help-desk; Database Oracle sau MS SQL. Munca in echipa si dorinta de a invata lucruri noi. Bune abilitati de comunicare",
                        isPaid: "false"
                    }, {
                        name: "Administrator baze de date MSSQL",
                        contactPerson: "Mihaela Plescan",
                        contactPersonTitle: "HR Senior Recruiting Coordinator",
                        contactPersonEmail: "hr-ro.it-solutions@atos.net",
                        numberOfStudents: "3",
                        period: "iulie-septembrie, in functie de disponibilitatea studentului",
                        description: "Suport pentru echipa de experti in monitorizarea parametrilor operationali din zona de MSSQL, mentinerea unei documentatii pentru sistemul urmarit, urmarirea implementarii schimbarii in infrastructura conform procedurii predefinita.",
                        requirements: "Cunostinte teoretice si practice in zona de: programare, administrare retele, testare sau help-desk; Database Oracle sau MS SQL. Munca in echipa si dorinta de a invata lucruri noi. Bune abilitati de comunicare",
                        isPaid: "false"
                    }, {
                        name: "Suport operational si Monitorizare contracte",
                        contactPerson: "Mihaela Plescan",
                        contactPersonTitle: "HR Senior Recruiting Coordinator",
                        contactPersonEmail: "hr-ro.it-solutions@atos.net",
                        numberOfStudents: "2",
                        period: "iulie-septembrie, in functie de disponibilitatea studentului",
                        description: "Suport pentru echipa de specialisti in crearea de rapoarte lunare, actualizarea unor baze de date, sarcini administrative de organizare si coordonare a unor proiecte scurte si cu nivel de dificultate mediu. Monitorizarea contractelor cu actori interni, dar si externi companiei; monitorizarea si adaptarea acestora.",
                        requirements: "Foarte buna cunoastere a pachetului Microsoft Office: Excel, Power point; cat si din zona de programare: Visual basic, Microsof SQL. Gandire si abordare sistemica in rezolvarea sarcinilor: prioritizare si organizare, time management, atentie la detalii; gandire analitica. Munca in echipa si dorinta de a invata lucruri noi. Bune abilitati de comunicare",
                        isPaid: "false"
                    }, {
                        name: " Managementul si coordonarea proiectelor",
                        contactPerson: "Mihaela Plescan",
                        contactPersonTitle: "HR Senior Recruiting Coordinator",
                        contactPersonEmail: "hr-ro.it-solutions@atos.net",
                        numberOfStudents: "3",
                        period: "iulie-septembrie, in functie de disponibilitatea studentului",
                        description: "Coordonarea si facilitarea din punct de vedere organizational a proiectelor impreuna cu echipele tehinice si echipele de rapoare.",
                        requirements: "Foarte buna cunoastere a pachetului Microsoft Office: Excel, Power point; Gandire si abordare sistemica in rezolvarea sarcinilor: prioritizare si organizare, time management, atentie la detalii; gandire analitica. Munca in echipa si dorinta de a invata lucruri noi. Bune abilitati de comunicare",
                        isPaid: "false"
                    }, {
                        name: "Monitorizare procese si proceduri",
                        contactPerson: "Mihaela Plescan",
                        contactPersonTitle: "HR Senior Recruiting Coordinator",
                        contactPersonEmail: "hr-ro.it-solutions@atos.net",
                        numberOfStudents: "6",
                        period: "iulie-septembrie, in functie de disponibilitatea studentului",
                        description: "Monitorizare sisteme ticketing. Asigurarea respectarii pasilor si procedurilor de procesare a operatiunilor.",
                        requirements: "Foarte buna cunoastere a pachetului Microsoft Office: Excel, Power point; Gandire si abordare sistemica in rezolvarea sarcinilor: prioritizare si organizare, time management, atentie la detalii; gandire analitica. Munca in echipa si dorinta de a invata lucruri noi. Bune abilitati de comunicare",
                        isPaid: "false"
                    }
                ]
            }, {
                name: "SAP",
                description: "SAP este în centrul revoluției tehnologice de astăzi. Ca lider de piațe în domeniul soluțiilor software de business,  SAP ajută companiile de orice dimensiune să diminueze efectele negative ale complexității și generează noi oportunități de creștere și inovare, aflându-se în permanență înaintea competiție.",
                web: "http://go.sap.com/romania/index",
                summerPracticePrograms: [
                    {
                        name: "SAP Romania – Timisoara",
                        contactPerson: "Mircea Romanitan",
                        contactPersonTitle: "Senior Development Consultant",
                        contactPersonEmail: " mircea.romanitan@sap.com",
                        numberOfStudents: "5",
                        period: "11.07.2016 - 30.09.2016 - 180 ore",
                        description: "Studierea tehnologiilor SAP, participarea la dezvoltarea unor proiecte interne.",
                        requirements: "Cunoașterea a cel puțin uneia dintre următoarele categorii: Limbaje de programare: C++, Java, alte limbaje Object Oriented; Baze de date: Oracle (PLISQL), SQL Server (T-SQL); Programare web: JSP, EJB, HTML/CSS, PHP, XML - nice to have. Engleza fluenta",
                        isPaid: "true"
                    }
                ]
            },
            {
                name: "SC CRM Software SRL",
                description: "CRM Software Srl este o societate cu capital românesc care își are sediul în Timișoara. Compania are o vastă experiență în dezvoltarea aplicațiilor pe mobil și PC. CRM Software a creat și îmbunătățit mai multe soluții video TV bazate pe platforma Multiscreen Video cum ar fi Du View, Andorra, Telecable. Am construit în timp o echipa specializata în obținerea de soluții complete, care îmbina armonios experiența dobândită în crearea de software orientat catre client, utilizarea facila a acestuia și design-ul grafic placut.",
                web: "https://goo.gl/maps/ZxjndVPSg2K2",
                summerPracticePrograms: [
                    {
                        name: "CRM Software",
                        contactPerson: "Peiov George",
                        contactPersonTitle: "Director",
                        contactPersonEmail: "office@crmsoftware.ro; gpeiov@crmsoftware.ro; casiana.puscas@crmsoftware.ro",
                        numberOfStudents: "2",
                        period: "11 iulie - 9 august",
                        description: "Analizarea scenariilor de testare primite și a documentației aplicației; definirea testelor, pașilor de testare și rezultatelor așteptate; stabilirea, pentru fiecare test în parte, a seturilor de date utilizate;  executarea scenariilor de testare; înregistarea rezultatelor, a incidentelor depistate și comunicarea lor catre dezvoltator; generarea rapoartelor de testare, a listei de incidente; analizarea rezultatelor, realizarea rapoartelor de testare și transmiterea lor catre parțile implicate",
                        requirements: "Atitudine proactiva, pozitiva și dorința de explora departamentul de testare al companiei. Cunoștințe bune de limba engleza. Simțul umorului (mare avantaj)",
                        isPaid: "true"
                    }
                ]
            },
            {
                name: "FLEX ROMANIA",
                description: " Flex is a leading sketch-to-scale solutions company that designs and builds intelligent products for a connected world. With more than 200,000 professionals across 30 countries and a promise to help make the world Live smarter™, the company provides innovative design, engineering, manufacturing, real-time supply chain insight and logistics services to companies of all sizes in various industries and end-markets. Flex operations in Timisoara serve customers in the automotive, medical, industrial and networking market sectors, with more than 4000 employees. Our manufacturing capabilities include printed circuit board assembly, new product introduction, box-build and high level system assembly. We also provide a full range of clean room product assembly for medical disposable devices.",
                web: "http://www.flextronics.com",
                summerPracticePrograms: [
                    {
                        name: "SAP Romania – Timisoara",
                        contactPerson: "Fulvia Golub",
                        contactPersonTitle: "Staffing Manager",
                        contactPersonEmail: " Fulvia.golub@flextronics.com",
                        isPaid: "true"
                    }
                ]
            },
            {
                name: "S.C. PRESSLABS S.R.L.",
                description: "Suntem o companie de hosting specializat în WordPress, fondata în Timișoara în 2011. Oamenii sunt foarte importanți pentru noi și ne dorim sa oferim servicii atât performante cât și umane, iar relația cu clienții, colegii sau partnerii de afaceri sa fie cât mai benefica de ambele parți. Clienții sunt cei mai buni promoteri ai nostri, iar acest lucru ne bucura pentru ca arata încrederea pe care o au în noi și confirma calitatea serviciilor noastre.",
                web: "https://www.presslabs.com/",
                summerPracticePrograms: [
                    {
                        name: "Programator Ajutor",
                        contactPerson: "Motrescu Valentina",
                        contactPersonTitle: "Manager Resurse Umane",
                        contactPersonEmail: "vali@presslabs.com",
                        numberOfStudents: "4",
                        period: "11 iulie – 5 septembrie",
                        description: "Implementarea de funcționalități noi pentru sistemul de facturare automata - 'Billing' și 'Silver'; dezvoltarea de noi funcționalități pentru platforma de gazduire în aplicația de gestiune - Oxygen, în cadrul echipei de infrastructura, în Python – Django",
                        requirements: "Cunoștințe de programare, algoritmica, programare orientata pe obiecte, proiectarea bazelor de date, principii de funcționare ale rețelelor de calculatoare, utilizarea sistemelor de versionare de cod – Git, utilizarea editorului VIM",
                        isPaid: "true"
                    }
                ]
            },
            {
                name: "Yazaki Component Technology SRl",
                description: "Yazaki Component Technology is an automotive supplier, part of Yazaki Corporation, a world leader in developing and manufacturing electric and electronic components for the greatest car makers in the world. We are present in Arad with a production site and in Timisoara with an R&D center.The R&D center located in Timisoara is an integrated part of the European R&D organization focussing on development and industrialization.Arad is lean production site of new instrument clusters and body controllers.",
                web: "http://www.yazaki-europe.com",
                summerPracticePrograms: [
                    {
                        name: "Departamentul Software Development",
                        contactPerson: "Helgiu Doinita",
                        contactPersonTitle: "HR&GA Coordinator",
                        contactPersonEmail: "doinita.helgiu@yazaki-europe.com",
                        numberOfStudents: "3",
                        period: "11 iulie – 11 septembrie",
                        description: "Dezvoltare software pentru componente ",
                        requirements: "Cunoștințe de baza microcontrolere  și programare C",
                        isPaid: "false"
                    }, {
                        name: "Departamentul Testare Software  ",
                        contactPerson: "Helgiu Doinita",
                        contactPersonTitle: "HR&GA Coordinator",
                        contactPersonEmail: "doinita.helgiu@yazaki-europe.com",
                        numberOfStudents: "2",
                        period: "11 iulie – 11 septembrie",
                        description: "Testare software instrumente de bord  ",
                        requirements: "Cunoștințe de baza microcontrolere și programare C",
                        isPaid: "false"
                    }, {
                        name: "Departamentul D&D Quality ",
                        contactPerson: "Helgiu Doinita",
                        contactPersonTitle: "HR&GA Coordinator",
                        contactPersonEmail: "doinita.helgiu@yazaki-europe.com",
                        numberOfStudents: "1",
                        period: "11 iulie – 11 septembrie",
                        description: "Optimizarea raportului de calitate în dezvoltarea proiectelor informatice  ",
                        requirements: "Cunoștințe VBA, Excel",
                        isPaid: "false"
                    }, {
                        name: "Departamentul Hardware ",
                        contactPerson: "Helgiu Doinita",
                        contactPersonTitle: "HR&GA Coordinator",
                        contactPersonEmail: "doinita.helgiu@yazaki-europe.com",
                        numberOfStudents: "2",
                        period: "11 iulie – 11 septembrie",
                        description: "Proiectare echipament de testare placi electronice ",
                        requirements: "Cunoștințe de baza despre electronica analogica și digitala, cunoștințe placi de circuit ",
                        isPaid: "false"
                    }, {
                        name: "Departamentul Product Engineering & Validation ",
                        contactPerson: "Helgiu Doinita",
                        contactPersonTitle: "HR&GA Coordinator",
                        contactPersonEmail: "doinita.helgiu@yazaki-europe.com",
                        numberOfStudents: "1",
                        period: "11 iulie – 11 septembrie",
                        description: "Dezvoltare plan validare",
                        requirements: "Cunoștințe de baza:  microcontrolere,  programare C și electronica analogica și digitala",
                        isPaid: "false"
                    }
                ]
            }
        ];

        //companies.forEach(company => {
        //    console.log(company);
        //    console.log(company.summerPracticePrograms);
        //    var newCompany = new Company({
        //        name: company.name,
        //        description: company.description,
        //        web: company.web
        //    });
        //    newCompany.save(function (err, savedCompany) {
        //        if (err) {
        //            console.log(error);
        //
        //        }
        //        else {
        //            company.summerPracticePrograms.forEach(program => {
        //                program.company = savedCompany._id;
        //                SummerPracticeProgram.create(program);
        //            });
        //        }
        //    });
        //
        //});
        //

        Company.remove({}, function (err) {
            SummerPracticeProgram.remove({}, function (err) {
                companies.forEach(company => {
                    SummerPracticeProgram.collection.insert(company.summerPracticePrograms, function (err, data) {
                        if (err) {
                            console.log(error);
                        } else {
                            var newCompany = new Company({
                                name: company.name,
                                description: company.description,
                                web: company.web,
                                summerPracticePrograms: data.insertedIds
                            });
                            newCompany.save(function (error, savedCompany) {
                                console.log(error);
                            });

                        }
                    });
                });
            });
        });


    }
}

