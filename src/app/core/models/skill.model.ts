export interface Skill {
  name: string;
  category?: SkillCategory;
  icon?: string;
  color?: string;
}

export type SkillCategory = 'frontend' | 'ml' | 'fundamentals' | 'tools';

