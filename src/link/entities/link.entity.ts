import { Entity, Column, PrimaryColumn, BeforeInsert, ManyToOne, JoinColumn } from 'typeorm';
import { generateShortURL } from '../../utils';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Link {
    @PrimaryColumn()
    bee_id: string;

    @Column({ nullable: true })
    name: string;

    @Column()
    original_url: string;

    @Column({ type: 'timestamp', nullable: true })
    expires_at: Date;

    @Column({ type: 'timestamp', nullable: true })
    last_visited_at: Date;

    @Column({ nullable: true })
    no_of_visits: number

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    @Column({ nullable: true })
    user_id: string;

    @ManyToOne(() => User, user => user.links, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @BeforeInsert()
    generateId() {
        this.bee_id = generateShortURL(this.original_url);
    }
}
