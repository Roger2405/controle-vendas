import './styles.scss';

interface Props {
    dark?: boolean
}

export default function Loading({ dark }: Props) {
    return (
        <div className={`loading ${dark ? 'dark' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
        </div >
    )
}