interface Props {
    featureIcon: string;
    featureName: string, 
    featureDetails :string,
}

export default function FeatureBlock({ featureIcon, featureName, featureDetails }: Props) {
    return (
        <div className="feature-block">
            <img className="feature-icon" alt="Feature Icon" src={featureIcon} />
            <h3>{featureName}</h3>
            <p>{featureDetails}</p>
        </div>
    )
}