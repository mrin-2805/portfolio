export interface ICareer {
    role: string;
    company: string;
    duration: string;
}

export interface ISkill {
    title: string;
    image: string;
    imageBg: string;
    imageText: string;
    level: number;
};

export interface IWebsiteContent {
    roles: string[];
    careers: ICareer[];
    skills: ISkill[];
}
