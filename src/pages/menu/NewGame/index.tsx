//index.tsx
import { UserRegistration } from './UserRegistration';
import { MenuLayout } from '@layouts/MenuLayout';
import logo from '@assets/logo.png';
import { BackButton } from './BackButton';

export function New() {
    return (
        <MenuLayout imageSrc={logo}>
            <BackButton></BackButton>
            <UserRegistration />
        </MenuLayout >

    )
}
