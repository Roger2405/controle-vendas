import './styles.scss';

interface Props {
    dark?: boolean
}

export default function Loading({ dark }: Props) {
    return (
        <div className="loading">
            <span className={`${dark ? 'dark' : ''}`}></span>
            <span className={`${dark ? 'dark' : ''}`}></span>
            <span className={`${dark ? 'dark' : ''}`}></span>
        </div>
    )
}