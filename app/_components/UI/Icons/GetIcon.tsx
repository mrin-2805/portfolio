import {
    AboutIcon,
    ArrowIcon,
    BehanceIcon,
    CareerIcon,
    CircleFillIcon,
    ContactIcon,
    DefaultIcon,
    DownloadIcon,
    EmailIcon,
    FooterContactIcon,
    GalleryIcon,
    HomeIcon,
    InstagramIcon,
    LinkedInIcon,
    MailIcon,
    MessageIcon,
    PersonIcon,
    SkillsIcon,
    WorksIcon,
} from "./Icons";

export function GetIcon({ iconName, width, height }: { iconName: string; width?: string; height?: string }) {
    switch (iconName) {
        case "Home":
            return <HomeIcon width={width} height={height} />;
        case "About":
            return <AboutIcon width={width} height={height} />;
        case "Works":
            return <WorksIcon width={width} height={height} />;
        case "Gallery":
            return <GalleryIcon width={width} height={height} />;
        case "Career":
            return <CareerIcon width={width} height={height} />;
        case "Skills":
            return <SkillsIcon width={width} height={height} />;
        case "Contact":
            return <ContactIcon width={width} height={height} />;
        case "LinkedIn":
            return <LinkedInIcon width={width} height={height} />;
        case "Behance":
            return <BehanceIcon width={width} height={height} />;
        case "Instagram":
            return <InstagramIcon width={width} height={height} />;
        case "Mail":
            return <MailIcon width={width} height={height} />;
        case "Download":
            return <DownloadIcon width={width} height={height} />;
        case "Circle Fill":
            return <CircleFillIcon width={width} height={height} />;
        case "FooterContactIcon":
            return <FooterContactIcon width={width} height={height} />;
        case "Arrow":
            return <ArrowIcon width={width} height={height} />;
        case "Person":
            return <PersonIcon width={width} height={height} />;
        case "Email":
            return <EmailIcon width={width} height={height} />;
        case "Message":
            return <MessageIcon width={width} height={height} />;
        default:
            return <DefaultIcon width={width} height={height} />;
    }
}
