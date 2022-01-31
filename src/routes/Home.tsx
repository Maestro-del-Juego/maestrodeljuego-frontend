import FeatureBlock from "../components/FeatureBlock";

export default function Home() {
    return (
        <>
        <img className="home-image" src="/catan.jpg" alt="Board game" />
        <div className="feature-list">
        <FeatureBlock
            featureIcon="/icon1.svg"
            featureName="Plan your game nights"
            featureDetails="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sodales, magna commodo gravida vestibulum, leo nisl viverra neque, id hendrerit."
        />
        <FeatureBlock
            featureIcon="/icon2.svg"
            featureName="Collect feedback"
            featureDetails="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sodales, magna commodo gravida vestibulum, leo nisl viverra neque, id hendrerit."
        />
        <FeatureBlock
            featureIcon="/icon3.svg"
            featureName="Track your play stats"
            featureDetails="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sodales, magna commodo gravida vestibulum, leo nisl viverra neque, id hendrerit."
        />
        <FeatureBlock
            featureIcon="/icon4.svg"
            featureName="Make hosting easy"
            featureDetails="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sodales, magna commodo gravida vestibulum, leo nisl viverra neque, id hendrerit."
        />
        <FeatureBlock
            featureIcon="/icon5.svg"
            featureName="Play more of your games"
            featureDetails="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sodales, magna commodo gravida vestibulum, leo nisl viverra neque, id hendrerit."
        />
        <FeatureBlock
            featureIcon="/icon6.svg"
            featureName="Organize your collection"
            featureDetails="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sodales, magna commodo gravida vestibulum, leo nisl viverra neque, id hendrerit."
        />
        </div>
        </>
    )
}