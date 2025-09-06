import React from 'react';
import type { OfferData, FunctionalModule, PaymentMethod, ServiceModule, Benefit, CostItem } from '@/types/offer';
import { Plus, Trash2, Eye, EyeOff } from 'lucide-react';

interface OfferEditorProps {
  offerData: OfferData;
  onUpdate: (data: OfferData) => void;
}

const OfferEditor: React.FC<OfferEditorProps> = ({ offerData, onUpdate }) => {
  const updateField = (path: string, value: unknown) => {
    const pathArray = path.split('.');
    const newData = { ...offerData };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let current: any = newData;

    for (let i = 0; i < pathArray.length - 1; i++) {
      current = current[pathArray[i]];
    }
    current[pathArray[pathArray.length - 1]] = value;

    onUpdate(newData);
  };

  const toggleSection = (sectionId: string) => {
    const newSections = offerData.sections.map(section =>
      section.id === sectionId ? { ...section, enabled: !section.enabled } : section
    );
    updateField('sections', newSections);
  };

  const addFunctionalModule = () => {
    const newModule: FunctionalModule = {
      id: Date.now().toString(),
      icon: '⚙',
      title: '',
      description: '',
    };
    updateField('functionalModules', [...offerData.functionalModules, newModule]);
  };

  const updateFunctionalModule = (moduleId: string, field: keyof FunctionalModule, value: unknown) => {
    const newModules = offerData.functionalModules.map(module =>
      module.id === moduleId ? { ...module, [field]: value } : module
    );
    updateField('functionalModules', newModules);
  };

  const removeFunctionalModule = (moduleId: string) => {
    const newModules = offerData.functionalModules.filter(module => module.id !== moduleId);
    updateField('functionalModules', newModules);
  };

  const addPaymentMethod = () => {
    const newMethod: PaymentMethod = {
      id: Date.now().toString(),
      icon: '💳',
      name: '',
      description: '',
    };
    updateField('paymentMethods', [...offerData.paymentMethods, newMethod]);
  };

  const updatePaymentMethod = (methodId: string, field: keyof PaymentMethod, value: unknown) => {
    const newMethods = offerData.paymentMethods.map(method =>
      method.id === methodId ? { ...method, [field]: value } : method
    );
    updateField('paymentMethods', newMethods);
  };

  const removePaymentMethod = (methodId: string) => {
    const newMethods = offerData.paymentMethods.filter(method => method.id !== methodId);
    updateField('paymentMethods', newMethods);
  };

  const addServiceModule = () => {
    const newModule: ServiceModule = {
      id: Date.now().toString(),
      icon: '🔧',
      title: '',
      description: '',
      features: [''],
    };
    updateField('serviceModules', [...offerData.serviceModules, newModule]);
  };

  const updateServiceModule = (moduleId: string, field: keyof ServiceModule, value: unknown) => {
    const newModules = offerData.serviceModules.map(module =>
      module.id === moduleId ? { ...module, [field]: value } : module
    );
    updateField('serviceModules', newModules);
  };

  const removeServiceModule = (moduleId: string) => {
    const newModules = offerData.serviceModules.filter(module => module.id !== moduleId);
    updateField('serviceModules', newModules);
  };

  const addBenefit = () => {
    const newBenefit: Benefit = {
      id: Date.now().toString(),
      icon: '✅',
      title: '',
      description: '',
    };
    updateField('benefits', [...offerData.benefits, newBenefit]);
  };

  const updateBenefit = (benefitId: string, field: keyof Benefit, value: unknown) => {
    const newBenefits = offerData.benefits.map(benefit =>
      benefit.id === benefitId ? { ...benefit, [field]: value } : benefit
    );
    updateField('benefits', newBenefits);
  };

  const removeBenefit = (benefitId: string) => {
    const newBenefits = offerData.benefits.filter(benefit => benefit.id !== benefitId);
    updateField('benefits', newBenefits);
  };

  const addCostItem = () => {
    const newItem: CostItem = {
      position: '',
      quantity: '',
      implementationCost: '',
      maintenanceCost: '',
    };
    updateField('costItems', [...offerData.costItems, newItem]);
  };

  const updateCostItem = (index: number, field: keyof CostItem, value: unknown) => {
    const newItems = [...offerData.costItems];
    newItems[index] = { ...newItems[index], [field]: value as string };
    updateField('costItems', newItems);
  };

  const removeCostItem = (index: number) => {
    const newItems = offerData.costItems.filter((_, i) => i !== index);
    updateField('costItems', newItems);
  };

  const getSectionEnabled = (sectionId: string) => {
    return offerData.sections.find(s => s.id === sectionId)?.enabled ?? true;
  };

  return (
    <div className="offer-editor">
      <h2 className="editor-title">Edytor Oferty</h2>

      {/* Section toggles */}
      <div className="section-toggles">
        <h3>Sekcje dokumentu:</h3>
        {offerData.sections.map((section: { id: string; enabled: boolean; name: string }) => (
          <label key={section.id} className="section-toggle-label">
            <input
              type="checkbox"
              checked={section.enabled}
              onChange={() => toggleSection(section.id)}
              className="section-checkbox"
            />
            <span className={`section-toggle ${section.enabled ? 'enabled' : 'disabled'}`}>
              {section.enabled ? <Eye size={16} /> : <EyeOff size={16} />}
              {section.name}
            </span>
          </label>
        ))}
      </div>

      {/* Company Info */}
      {getSectionEnabled('companyInfo') && (
        <div className="editor-section">
          <h3>Informacje o Firmie</h3>
          <div className="form-grid">
            <input
              type="text"
              placeholder="Nazwa firmy"
              value={offerData.companyInfo.name}
              onChange={(e) => updateField('companyInfo.name', e.target.value)}
            />
            <textarea
              placeholder="Opis firmy"
              value={offerData.companyInfo.description}
              onChange={(e) => updateField('companyInfo.description', e.target.value)}
              rows={3}
            />
            <input
              type="text"
              placeholder="Telefon"
              value={offerData.companyInfo.phone}
              onChange={(e) => updateField('companyInfo.phone', e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={offerData.companyInfo.email}
              onChange={(e) => updateField('companyInfo.email', e.target.value)}
            />
            <input
              type="text"
              placeholder="Logo (URL)"
              value={offerData.companyInfo.logo || ''}
              onChange={(e) => updateField('companyInfo.logo', e.target.value)}
            />
          </div>
        </div>
      )}

      {/* Introduction */}
      {getSectionEnabled('introduction') && (
        <div className="editor-section">
          <h3>Wprowadzenie</h3>
          <div className="form-grid">
            <input
              type="text"
              placeholder="Tytuł wprowadzenia"
              value={offerData.introduction.title}
              onChange={(e) => updateField('introduction.title', e.target.value)}
            />
            <textarea
              placeholder="Opis wprowadzenia"
              value={offerData.introduction.description}
              onChange={(e) => updateField('introduction.description', e.target.value)}
              rows={4}
            />
          </div>
        </div>
      )}

      {/* Functional Modules */}
      {getSectionEnabled('functionalModules') && (
        <div className="editor-section">
          <div className="section-header">
            <h3>Zakres Funkcjonalny</h3>
            <button className="add-item-btn" onClick={addFunctionalModule}>
              <Plus size={16} />
              Dodaj moduł
            </button>
          </div>

          {offerData.functionalModules.map((module) => (
            <div key={module.id} className="item-row">
              <input
                type="text"
                placeholder="Ikona (emoji)"
                value={module.icon}
                onChange={(e) => updateFunctionalModule(module.id, 'icon', e.target.value)}
                className="icon-input"
              />
              <input
                type="text"
                placeholder="Tytuł modułu"
                value={module.title}
                onChange={(e) => updateFunctionalModule(module.id, 'title', e.target.value)}
              />
              <textarea
                placeholder="Opis modułu"
                value={module.description}
                onChange={(e) => updateFunctionalModule(module.id, 'description', e.target.value)}
                rows={3}
              />
              <button
                className="remove-item-btn"
                onClick={() => removeFunctionalModule(module.id)}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Payment Methods */}
      {getSectionEnabled('paymentMethods') && (
        <div className="editor-section">
          <div className="section-header">
            <h3>Metody Płatności</h3>
            <button className="add-item-btn" onClick={addPaymentMethod}>
              <Plus size={16} />
              Dodaj metodę
            </button>
          </div>

          {offerData.paymentMethods.map((method) => (
            <div key={method.id} className="item-row">
              <input
                type="text"
                placeholder="Ikona (emoji)"
                value={method.icon}
                onChange={(e) => updatePaymentMethod(method.id, 'icon', e.target.value)}
                className="icon-input"
              />
              <input
                type="text"
                placeholder="Nazwa metody"
                value={method.name}
                onChange={(e) => updatePaymentMethod(method.id, 'name', e.target.value)}
              />
              <input
                type="text"
                placeholder="Opis metody"
                value={method.description}
                onChange={(e) => updatePaymentMethod(method.id, 'description', e.target.value)}
              />
              <button
                className="remove-item-btn"
                onClick={() => removePaymentMethod(method.id)}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Service Modules */}
      {getSectionEnabled('serviceModules') && (
        <div className="editor-section">
          <div className="section-header">
            <h3>Moduły Usługowe</h3>
            <button className="add-item-btn" onClick={addServiceModule}>
              <Plus size={16} />
              Dodaj moduł
            </button>
          </div>

          {offerData.serviceModules.map((module) => (
            <div key={module.id} className="item-row service-module">
              <input
                type="text"
                placeholder="Ikona (emoji)"
                value={module.icon}
                onChange={(e) => updateServiceModule(module.id, 'icon', e.target.value)}
                className="icon-input"
              />
              <input
                type="text"
                placeholder="Tytuł modułu"
                value={module.title}
                onChange={(e) => updateServiceModule(module.id, 'title', e.target.value)}
              />
              <textarea
                placeholder="Opis modułu"
                value={module.description}
                onChange={(e) => updateServiceModule(module.id, 'description', e.target.value)}
                rows={2}
              />
              <div className="features-container">
                <label>Funkcje:</label>
                {module.features.map((feature, index) => (
                  <input
                    key={index}
                    type="text"
                    placeholder={`Funkcja ${index + 1}`}
                    value={feature}
                    onChange={(e) => {
                      const newFeatures = [...module.features];
                      newFeatures[index] = e.target.value;
                      updateServiceModule(module.id, 'features', newFeatures);
                    }}
                  />
                ))}
                <button
                  type="button"
                  onClick={() => {
                    const newFeatures = [...module.features, ''];
                    updateServiceModule(module.id, 'features', newFeatures);
                  }}
                  className="add-feature-btn"
                >
                  Dodaj funkcję
                </button>
              </div>
              <button
                className="remove-item-btn"
                onClick={() => removeServiceModule(module.id)}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Benefits */}
      {getSectionEnabled('benefits') && (
        <div className="editor-section">
          <div className="section-header">
            <h3>Korzyści z Modelu SaaS</h3>
            <button className="add-item-btn" onClick={addBenefit}>
              <Plus size={16} />
              Dodaj korzyść
            </button>
          </div>

          {offerData.benefits.map((benefit) => (
            <div key={benefit.id} className="item-row">
              <input
                type="text"
                placeholder="Ikona (emoji)"
                value={benefit.icon}
                onChange={(e) => updateBenefit(benefit.id, 'icon', e.target.value)}
                className="icon-input"
              />
              <input
                type="text"
                placeholder="Tytuł korzyści"
                value={benefit.title}
                onChange={(e) => updateBenefit(benefit.id, 'title', e.target.value)}
              />
              <textarea
                placeholder="Opis korzyści"
                value={benefit.description}
                onChange={(e) => updateBenefit(benefit.id, 'description', e.target.value)}
                rows={2}
              />
              <button
                className="remove-item-btn"
                onClick={() => removeBenefit(benefit.id)}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Pricing Structure */}
      {getSectionEnabled('pricingStructure') && (
        <div className="editor-section">
          <h3>Struktura Opłat</h3>
          <div className="form-grid">
            <textarea
              placeholder="Koszt uruchomienia (Setup Fee)"
              value={offerData.pricingStructure.setupFee}
              onChange={(e) => updateField('pricingStructure.setupFee', e.target.value)}
              rows={2}
            />
            <textarea
              placeholder="Koszt miesięcznego utrzymania"
              value={offerData.pricingStructure.monthlyCost}
              onChange={(e) => updateField('pricingStructure.monthlyCost', e.target.value)}
              rows={2}
            />
            <textarea
              placeholder="Model opłat transakcyjnych"
              value={offerData.pricingStructure.transactionModel}
              onChange={(e) => updateField('pricingStructure.transactionModel', e.target.value)}
              rows={2}
            />
            <textarea
              placeholder="Koszt dostawców danych"
              value={offerData.pricingStructure.dataProviderCost}
              onChange={(e) => updateField('pricingStructure.dataProviderCost', e.target.value)}
              rows={2}
            />
          </div>
        </div>
      )}

      {/* Cost Breakdown */}
      {getSectionEnabled('costBreakdown') && (
        <div className="editor-section">
          <div className="section-header">
            <h3>Szczegółowy Koszt Wdrożenia</h3>
            <button className="add-item-btn" onClick={addCostItem}>
              <Plus size={16} />
              Dodaj pozycję
            </button>
          </div>

          {offerData.costItems.map((item, index) => (
            <div key={index} className="item-row cost-item">
              <input
                type="text"
                placeholder="Pozycja"
                value={item.position}
                onChange={(e) => updateCostItem(index, 'position', e.target.value)}
              />
              <input
                type="text"
                placeholder="Ilość / Stawka"
                value={item.quantity}
                onChange={(e) => updateCostItem(index, 'quantity', e.target.value)}
              />
              <input
                type="text"
                placeholder="Koszt wdrożenia"
                value={item.implementationCost}
                onChange={(e) => updateCostItem(index, 'implementationCost', e.target.value)}
              />
              <input
                type="text"
                placeholder="Koszt utrzymania"
                value={item.maintenanceCost}
                onChange={(e) => updateCostItem(index, 'maintenanceCost', e.target.value)}
              />
              <button
                className="remove-item-btn"
                onClick={() => removeCostItem(index)}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OfferEditor;
