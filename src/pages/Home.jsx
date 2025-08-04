import { useMemo } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Box,
} from '@mui/material';
import { motion } from 'framer-motion';
import { getTheme } from '../theme';
import profilePic from '../assets/maxresdefault.jpg';

const Home = ({ language, mode }) => {
  const theme = useMemo(() => getTheme(mode), [mode]);

  // Переводы
  const translations = {
    en: {
      welcome: 'Welcome!',
      about: 'About Me',
      skills: 'Skills',
      experience: 'Work Experience',
      name: 'Ibrahim Zanitdinov',
      address: 'Antalya, Turkey',
      phone: '+90 536 484 83 65',
      email: 'bakeboy99@gmail.com',
      nationality: 'Kazakh',
      aboutText: `
        I am a software engineering student and game developer. Skilled in Blender and Photoshop, proficient in C++, Java. Born in Saudi Arabia, where I received my primary education.
      `,
      skillsList: [
        '3D & Graphics: Blender, Photoshop',
        'Programming: C++, C, Java',
        'Game Development: Unity (basic), game design',
        'Adaptability',
        'Problem Solving',
        'Teamwork',
        'Strong Communication',
      ],
      exp1Title: 'Waiter / Guest Receptionist',
      exp1Company: 'Kale, Kazakhstan',
      exp1Period: '2020 - 2021',
      exp1Desc: 'Greeting guests, serving, teamwork.',
      exp2Title: 'Real Estate Agent / Consultant',
      exp2Company: 'INA Gayrimenkul, İstanbul',
      exp2Period: '2022 - 2023',
      exp2Desc: 'Consulting on real estate, sales management.',
    },
    ru: {
      welcome: 'Добро пожаловать!',
      about: 'Обо мне',
      skills: 'Навыки',
      experience: 'Опыт работы',
      name: 'Ибрагим Занитдинов',
      address: 'Анталья, Турция',
      phone: '+90 536 484 83 65',
      email: 'bakeboy99@gmail.com',
      nationality: 'Казах',
      aboutText: `
        Я студент программной инженерии и разработчик игр. Умею работать в Blender и Photoshop, владею C++, Java. Родился в Саудовской Аравии, где получил начальное образование.
      `,
      skillsList: [
        '3D & Графика: Blender, Photoshop',
        'Программирование: C++, C, Java',
        'Разработка игр: Unity (базовый), дизайн игр',
        'Адаптация к ситуациям',
        'Решение проблем',
        'Командная работа',
        'Сильные коммуникации',
      ],
      exp1Title: 'Официант / Приём гостей',
      exp1Company: 'Kale, Казахстан',
      exp1Period: '2020 - 2021',
      exp1Desc: 'Приветствие гостей, обслуживание, работа в команде.',
      exp2Title: 'Риелтор / Консультант по недвижимости',
      exp2Company: 'INA Gayrimenkul, İstanbul',
      exp2Period: '2022 - 2023',
      exp2Desc: 'Консультирование по недвижимости, управление продажами.',
    },
    tr: {
      welcome: 'Hoş geldiniz!',
      about: 'Hakkımda',
      skills: 'Beceriler',
      experience: 'İş Deneyimi',
      name: 'İbrahim Zanitdinov',
      address: 'Antalya, Türkiye',
      phone: '+90 536 484 83 65',
      email: 'bakeboy99@gmail.com',
      nationality: 'Kazak',
      aboutText: `
        Yazılım mühendisliği öğrencisiyim ve oyun geliştiricisiyim. Blender ve Photoshop kullanabiliyorum, C++ ve Java biliyorum. Suudi Arabistan'da doğdum ve ilk eğitimimi orada aldım.
      `,
      skillsList: [
        '3D & Grafik: Blender, Photoshop',
        'Programlama: C++, C, Java',
        'Oyun Geliştirme: Unity (temel), oyun tasarımı',
        'Duruma Adaptasyon',
        'Problem Çözme',
        'Takım Çalışması',
        'Güçlü İletişim',
      ],
      exp1Title: 'Garson / Misafir Karşılama Görevlisi',
      exp1Company: 'Kale, Kazakistan',
      exp1Period: '2020 - 2021',
      exp1Desc: 'Misafirleri karşılama, servis yapma, takım çalışması.',
      exp2Title: 'Emlak Danışmanı / Uzman',
      exp2Company: 'INA Gayrimenkul, İstanbul',
      exp2Period: '2022 - 2023',
      exp2Desc: 'Emlak danışmanlığı, satış yönetimi.',
    },
  };

  const t = translations[language];

  const experience = [
    {
      title: t.exp1Title,
      company: t.exp1Company,
      period: t.exp1Period,
      description: t.exp1Desc,
    },
    {
      title: t.exp2Title,
      company: t.exp2Company,
      period: t.exp2Period,
      description: t.exp2Desc,
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <Container sx={{ mt: 4, py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Avatar
          src={profilePic}
          sx={{ width: 150, height: 150, margin: '0 auto' }}
        />
        <Typography variant="h4" gutterBottom>
          {t.name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {t.address} | {t.phone} | {t.email} | {t.nationality}
        </Typography>
      </Box>

      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={cardVariants}
        viewport={{ once: true, amount: 0.3 }}
      >
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              {t.about}
            </Typography>
            <Typography variant="body1">{t.aboutText}</Typography>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={cardVariants}
        viewport={{ once: true, amount: 0.3 }}
      >
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              {t.skills}
            </Typography>
            <Grid container spacing={3}>
              {t.skillsList.map((skill, index) => (
                <Grid
                  key={index}
                  sx={{
                    width: {
                      xs: '100%',
                      sm: '50%',
                    },
                  }}
                >
                  <Typography variant="body1">{skill}</Typography>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={cardVariants}
        viewport={{ once: true, amount: 0.3 }}
      >
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              {t.experience}
            </Typography>
            {experience.map((exp, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography variant="h6">{exp.title} - {exp.company}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {exp.period}
                </Typography>
                <Typography variant="body1">{exp.description}</Typography>
              </Box>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </Container>
  );
};

export default Home;