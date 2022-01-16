import FeatureBlock from "../components/featureBlock"

export default function Home() {
    return (
        <>
        <img className="home-image" src="/catan.jpg" alt="Board game" />
        <div className="feature-list">
        <FeatureBlock
            featureIcon="/icon1.svg"
            featureName="Feature Name 1"
            featureDetails="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sodales, magna commodo gravida vestibulum, leo nisl viverra neque, id hendrerit."
        />
        <FeatureBlock
            featureIcon="/icon2.svg"
            featureName="Feature Name 2"
            featureDetails="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sodales, magna commodo gravida vestibulum, leo nisl viverra neque, id hendrerit."
        />
        <FeatureBlock
            featureIcon="/icon3.svg"
            featureName="Feature Name 3"
            featureDetails="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sodales, magna commodo gravida vestibulum, leo nisl viverra neque, id hendrerit."
        />
        <FeatureBlock
            featureIcon="/icon4.svg"
            featureName="Feature Name 4"
            featureDetails="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sodales, magna commodo gravida vestibulum, leo nisl viverra neque, id hendrerit."
        />
        <FeatureBlock
            featureIcon="/icon5.svg"
            featureName="Feature Name 5"
            featureDetails="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sodales, magna commodo gravida vestibulum, leo nisl viverra neque, id hendrerit."
        />
        <FeatureBlock
            featureIcon="/icon6.svg"
            featureName="Feature Name 6"
            featureDetails="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sodales, magna commodo gravida vestibulum, leo nisl viverra neque, id hendrerit."
        />
        </div>
        </>
    )
}