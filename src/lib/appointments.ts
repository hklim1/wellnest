const data = [
    {
        memberId: "8URmu9InmD3tZdeVnKHy",
        title: "Dentist",
        location: "Einstein Medical Center",
        date: "Fri, February 2, 2024",
        phone: "(347)-647-5779",
        _id: 1,
        time: "9:30 AM",
        formattedDate: "2024-02-02",
        notes: "Dental checkup",
        reminder: "30 minutes before",
    },
    {
        memberId: "au99N0LQN7VeKiDo4pdH3vr4R1B3",
        title: "Doctor",
        location: "General Hospital",
        date: "Sat, February 3, 2024",
        phone: "(215)-123-4567",
        _id: 2,
        time: "10:00 AM",
        formattedDate: "2024-02-03",
        notes: "General health check",
        reminder: "1 hour before",
    },
    {
        memberId: "au99N0LQN7VeKiDo4pdH3vr4R1B3",
        title: "Physiotherapist",
        location: "Rehabilitation Clinic",
        date: "Sun, February 4, 2024",
        phone: "(610)-789-0123",
        _id: 3,
        time: "11:15 AM",
        formattedDate: "2024-02-04",
        notes: "Physical therapy session",
        reminder: "15 minutes before",
    },
    {
        memberId: "au99N0LQN7VeKiDo4pdH3vr4R1B3",
        title: "Optometrist",
        location: "Eye Care Center",
        date: "Mon, February 5, 2024",
        phone: "(267)-543-2109",
        _id: 4,
        time: "2:45 PM",
        formattedDate: "2024-02-05",
        notes: "Eye examination",
        reminder: "45 minutes before",
    },
    {
        memberId: "jW25rA3hOne1sCYP5HKB",
        title: "Orthopedic Surgeon",
        location: "Ortho Clinic",
        date: "Tue, February 6, 2024",
        phone: "(484)-876-5432",
        _id: 5,
        time: "4:30 PM",
        formattedDate: "2024-02-06",
        notes: "Orthopedic consultation",
        reminder: "20 minutes before",
    },
    {
        memberId: "jW25rA3hOne1sCYP5HKB",
        title: "Psychiatrist",
        location: "Mental Health Center",
        date: "Wed, February 7, 2024",
        phone: "(609)-234-5678",
        _id: 6,
        time: "1:00 PM",
        formattedDate: "2024-02-07",
        notes: "Psychiatric evaluation",
        reminder: "1 hour before",
    },
    {
        memberId: "8URmu9InmD3tZdeVnKHy",
        title: "Dermatologist",
        location: "Skin Care Clinic",
        date: "Thu, February 8, 2024",
        phone: "(215)-987-6543",
        _id: 7,
        time: "3:20 PM",
        formattedDate: "2024-02-08",
        notes: "Skin check",
        reminder: "30 minutes before",
    },
    {
        memberId: "8URmu9InmD3tZdeVnKHy",
        title: "Cardiologist",
        location: "Heart Health Center",
        date: "Fri, February 9, 2024",
        phone: "(267)-876-5432",
        _id: 8,
        time: "12:45 PM",
        formattedDate: "2024-02-09",
        notes: "Cardiac consultation",
        reminder: "15 minutes before",
    },
    {
        memberId: "au99N0LQN7VeKiDo4pdH3vr4R1B3",
        title: "Gynecologist",
        location: "Women's Health Clinic",
        date: "Sat, February 10, 2024",
        phone: "(610)-123-4567",
        _id: 9,
        time: "9:00 AM",
        formattedDate: "2024-02-10",
        notes: "Women's health check",
        reminder: "40 minutes before",
    },
    {
        memberId: "au99N0LQN7VeKiDo4pdH3vr4R1B3",
        title: "Podiatrist",
        location: "Foot Care Clinic",
        date: "Sun, February 11, 2024",
        phone: "(484)-234-5678",
        _id: 10,
        time: "11:30 AM",
        formattedDate: "2024-02-11",
        notes: "Podiatry appointment",
        reminder: "25 minutes before",
    },
];

export default data;

type AppointmentType = {
    memberId: string;
    title: string;
    location: string;
    date: string;
    phone: string;
    _id: number;
    time: string;
    formattedDate: string;
    notes: string;
    reminder: string;
};

export { AppointmentType };
